"use client"
import React, { useState, useEffect } from "react"
import { calculateBankInterestSimple } from "@/lib/calculator"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/ui/FormInput"
import { CalendarSelect } from "@/components/ui/CalendarSelect"
import { CalendarType } from "@/lib/types"
import Modal from "@/components/ui/Modal"
import { AppToaster } from "@/components/ui/toast"

export function BankInterestCalculator({
  onCalculationComplete,
}: {
  onCalculationComplete?: (result: { interest: number; total: number; days: number } | null) => void
} = {}) {
  const [principal, setPrincipal] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState<Date>(
    new Date(Date.now())
  )
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.AD)
  const [result, setResult] = useState<{ interest: number; total: number; days: number } | null>(null)
  const [open, setOpen] = useState(false)

  // Calculate number of days
  const calculateDays = () => {
    if (startDate && endDate) {
      const diff = endDate.getTime() - startDate.getTime()
      const days = Math.ceil(diff / (1000 * 3600 * 24))
      return Math.max(0, days)
    }
    return 0
  }
  const days = calculateDays()

  // Auto-calc interest
  useEffect(() => {
    if (principal > 0 && rate > 0 && days > 0) {
      const calc = calculateBankInterestSimple(principal, rate, days)
      const withDays = { ...calc, days }
      setResult(withDays)
      onCalculationComplete?.(withDays)
    } else {
      setResult(null)
    }
  }, [principal, rate, days, onCalculationComplete])

  const handleCalculate = () => {
    if (principal > 0 && rate > 0 && days > 0) {
      const calc = calculateBankInterestSimple(principal, rate, days)
      const withDays = { ...calc, days }
      setResult(withDays)
      onCalculationComplete?.(withDays)
      setOpen(true) 
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Principal and Rate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          type="number"
          step="0.01"
          value={principal || ""}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          label="Principal Amount"
          placeholder="Enter amount"
        />

        <FormInput
          type="number"
          step="0.01"
          value={rate || ""}
          onChange={(e) => setRate(Number(e.target.value))}
          label="Interest Rate (%)"
          placeholder="Annual rate"
        />
      </div>

      {/* Calendar Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Calendar Type</label>
        <select
          value={calendarType}
          onChange={(e) => setCalendarType(e.target.value as CalendarType)}
          className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        >
          <option value={CalendarType.AD}>Gregorian Calendar (AD)</option>
          <option value={CalendarType.BS}>Bikram Sambat (BS)</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalendarSelect
          value={startDate}
          onChange={setStartDate}
          calendarType={calendarType}
          label="Start Date"
          placeholder="Select start date"
        />

        <CalendarSelect
          value={endDate}
          onChange={setEndDate}
          calendarType={calendarType}
          label="End Date"
          placeholder="Select end date"
        />
      </div>

      {/* Duration */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-sm text-muted-foreground">Duration</div>
        <div className="font-medium">{days} days</div>
      </div>

      {/* Button */}
      <Button
        onClick={handleCalculate}
        className="w-full"
        disabled={!principal || !rate || days <= 0}
      >
        Calculate Bank Interest
      </Button>

      {/* Result Modal (shared Modal component) */}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Bank Interest Calculation"
        description="Here’s your detailed calculation result:"
        size="sm"
        className="sm:max-w-md"
        footer={
          <Button onClick={() => setOpen(false)} className="w-full">
            Close
          </Button>
        }
      >
        <AppToaster />

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Principal:</span>
                <span className="font-medium">Rs.{principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="font-medium">{rate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{days} days</span>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Interest Earned:</span>
              <span className="font-semibold text-primary">
                Rs.{result.interest.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-bold text-lg">
                Rs.{result.total.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
