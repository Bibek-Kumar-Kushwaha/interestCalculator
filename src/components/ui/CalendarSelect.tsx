import { adToBs, bsToAdDate } from "@/lib/bs-ad";
import { CalendarType } from "@/lib/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import "@/styles/nepali-datepicker-override.css";
import { showError } from "@/components/ui/toast";

interface CalendarSelectProps {
  value?: Date;
  onChange: (date: Date) => void;
  calendarType: CalendarType;
  placeholder?: string;
  label?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function CalendarSelect({
  value,
  onChange,
  calendarType,
  placeholder = "Select date",
  label,
  className,
  minDate,
  maxDate,
}: CalendarSelectProps) {
  const [bsValue, setBsValue] = useState<string>("");

  // Convert AD → BS for display when switching to BS
  useEffect(() => {
    if (calendarType === CalendarType.BS && value) {
      try {
        const bs = adToBs(value);
        const formatted = `${bs.year}-${String(bs.month).padStart(
          2,
          "0"
        )}-${String(bs.day).padStart(2, "0")}`;
        setBsValue(formatted);
      } catch {
        setBsValue("");
      }
    } else if (calendarType === CalendarType.AD) {
      setBsValue("");
    }
  }, [calendarType, value]);

  const handleDateChange = (date: Date) => {
    // Validate against minDate and maxDate
    if (minDate && date < minDate) {
      showError(`Date cannot be before ${format(minDate, "PPP")}`);
      return;
    }
    if (maxDate && date > maxDate) {
      showError(`Date cannot be after ${format(maxDate, "PPP")}`);
      return;
    }
    onChange(date);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}

      {calendarType === CalendarType.AD ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => date && handleDateChange(date)}
              captionLayout="dropdown"
              fromDate={minDate}
              toDate={maxDate}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <div className="w-full relative">
          <NepaliDatePicker
             inputClassName="form-control w-full border border-border rounded-md p-2 text-sm pl-10 z-10"
            className="w-full"
            value={bsValue}
            onChange={(bsDate: string) => {
              setBsValue(bsDate);
              const [year, month, day] = bsDate.split("-").map(Number);
              try {
                const adDate = bsToAdDate(year, month, day);
                if (adDate) handleDateChange(adDate);
              } catch {
                console.error("Invalid BS date selected");
              }
            }}
            options={{ calenderLocale: "en", valueLocale: "en" }}
            
          />

          {/* Placeholder overlay when no BS value */}
          {!bsValue && (
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none select-none text-sm">
              {placeholder}
            </span>
          )}

          {/* Calendar icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <CalendarIcon className="h-4 w-4" />
          </span>
        </div>
      )}
    </div>
  );
}
