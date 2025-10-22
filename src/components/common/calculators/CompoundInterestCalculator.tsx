"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  compoundInterestSchema,
  CompoundInterestFormData,
  CalendarType,
} from "@/lib/types";
import { calculateCompoundInterest } from "@/lib/calculator";
import { bsToAdDate } from "@/lib/bs-ad";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { CalendarSelect } from "@/components/ui/CalendarSelect";
import Modal from "@/components/ui/Modal";
import { AppToaster, showError } from "@/components/ui/toast";
import { toast } from "sonner";

export function CompoundInterestCalculator({
  onCalculationComplete,
}: {
  onCalculationComplete?: (result: { totalAmount: number; interestAmount: number; principal: number; durationDays: number; compoundingPeriods?: number } | null) => void;
}) {
  const memoizedCallback = React.useCallback((result: ReturnType<typeof calculateCompoundInterest>) => {
    onCalculationComplete?.(result);
  }, [onCalculationComplete]);

  const [result, setResult] = useState<ReturnType<typeof calculateCompoundInterest> | null>(null);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, watch, setValue } =
    useForm<CompoundInterestFormData>({
      resolver: zodResolver(compoundInterestSchema),
      defaultValues: {
        principal: 0,
        rate: 0,
        startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now()),
        calendarType: CalendarType.AD,
      },
    });

  const calendarType = watch("calendarType");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  function onSubmit(data: CompoundInterestFormData) {
    let s: unknown = data.startDate;
    let e: unknown = data.endDate;

    function isBsObject(x: unknown): x is { year: number; month: number; day: number } {
      return typeof x === "object" && x !== null && "year" in x && "month" in x && "day" in x;
    }

    // Convert BS → AD if needed
    if (data.calendarType === CalendarType.BS) {
      try {
        if (isBsObject(s)) s = bsToAdDate(s.year, s.month, s.day);
        if (isBsObject(e)) e = bsToAdDate(e.year, e.month, e.day);
      } catch {
        showError("Invalid Bikram Sambat date provided");
        return;
      }
    }

  const start = new Date((s as Date) || String(s) || Date.now());
  const end = new Date((e as Date) || String(e) || Date.now());

    // Validation: start must be smaller than end
    if (start >= end) {
      toast.error("Start date must be earlier than end date.");
      return;
    }

    const calculationResult = calculateCompoundInterest({
      principal: Number(data.principal),
      rate: Number(data.rate),
      startDate: start,
      endDate: end,
      calendarType: data.calendarType,
    });

    setResult(calculationResult as ReturnType<typeof calculateCompoundInterest>);
    memoizedCallback(calculationResult as ReturnType<typeof calculateCompoundInterest>);
    setOpen(true);
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Principal & Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            type="number"
            step="0.01"
            {...register("principal", { valueAsNumber: true })}
            label="Principal Amount"
            placeholder="Enter amount"
          />
          <FormInput
            type="number"
            step="0.01"
            {...register("rate", { valueAsNumber: true })}
            label="Interest Rate (%)"
            placeholder="Annual rate"
          />
        </div>

        {/* Calendar Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Calendar Type
          </label>
          <select
            {...register("calendarType")}
            onChange={(e) =>
              setValue("calendarType", e.target.value as CalendarType)
            }
            className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value={CalendarType.AD}>Gregorian Calendar (AD)</option>
            <option value={CalendarType.BS}>Bikram Sambat (BS)</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalendarSelect
            key={`start-${calendarType}`} 
            value={startDate}
            onChange={(date) => setValue("startDate", date)}
            calendarType={calendarType}
            label="Start Date"
            placeholder="Select Start Date"
          />
          <CalendarSelect
            key={`end-${calendarType}`} 
            value={endDate}
            onChange={(date) => setValue("endDate", date)}
            calendarType={calendarType}
            label="End Date"
            placeholder="Select End Date"
          />
        </div>

        <Button 
        type="submit" 
        className={`w-full`}
        disabled={!watch("principal") || !watch("rate") }
        >
          Calculate Compound Interest
        </Button>
      </form>

      {/* Result Modal (shared Modal component) */}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Compound Interest Result"
        description="Here’s the detailed breakdown of your calculation."
        size="lg"
        className="max-w-3xl overflow-y-auto bg-card p-8 rounded-2xl border border-border"
        footer={
          <div className="flex justify-center mt-4 w-full">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        <AppToaster />

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Principal Amount:</span>
                <span className="font-medium">
                  Rs. {result.principal?.toLocaleString() || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="font-medium">{watch("rate")}% per annum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{result.durationDays} days</span>
              </div>
              {result.compoundingPeriods && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compounding Periods:</span>
                  <span className="font-medium">{result.compoundingPeriods}</span>
                </div>
              )}
            </div>

            <hr className="border-border" />

            <div className="grid gap-4 text-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Earned:</span>
                <span className="font-semibold text-primary">
                  Rs. {result.interestAmount?.toLocaleString() || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-xl">
                  Rs. {result.totalAmount?.toLocaleString() || "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
