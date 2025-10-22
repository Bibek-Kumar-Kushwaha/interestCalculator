"use client"
import React, { useState, useRef, useEffect } from "react"
import { CalendarType } from "@/lib/types"
import { AgeResult } from "@/lib/types"
import { CalendarSelect } from "@/components/ui/CalendarSelect"
import Modal from "@/components/ui/Modal"
import { Calendar, Calculator, X } from "lucide-react"
import { DialogActionButton, EnhancedButton } from "@/components/ui/EnhanceButton"
import { AppToaster, showError } from "@/components/ui/toast"

export function AgeCalculator() {
  const [calendar, setCalendar] = useState<CalendarType>(CalendarType.AD)
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [result, setResult] = useState<AgeResult | null>(null)
  const [open, setOpen] = useState(false)
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false)
  const calendarSelectRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        calendarSelectRef.current &&
        !calendarSelectRef.current.contains(event.target as Node)
      ) {
        setShowCalendarDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function compute(birth: Date) {
    const current = new Date()
    
    // Validate birth date is not in future
    if (birth > current) {
      showError("Birth date cannot be in the future")
      return
    }

    let years = current.getFullYear() - birth.getFullYear()
    let months = current.getMonth() - birth.getMonth()
    let days = current.getDate() - birth.getDate()
    
    if (days < 0) {
      months--
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0)
      days += lastMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }
    
    const totalDays = Math.floor(
      (current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    )
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months
    
    // Calculate next birthday
    const nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < current) {
      nextBirthday.setFullYear(current.getFullYear() + 1)
    }
    const daysUntil = Math.ceil(
      (nextBirthday.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    )
    
    const out: AgeResult = {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: { date: nextBirthday, daysUntil },
    }
    setResult(out)
    setOpen(true)
  }

  const handleCalendarChange = (value: CalendarType) => {
    setCalendar(value)
    setShowCalendarDropdown(false)
  }

  return (
    <div className="max-w-md mx-auto space-y-6 relative">
      {/* Calendar Type - Enhanced with custom dropdown */}
      <div className="space-y-2 relative" ref={calendarSelectRef}>
        <label className="text-sm font-medium text-muted-foreground">
          Calendar Type
        </label>
        
        {/* Custom Select Trigger */}
        <div 
          className="w-full p-3 border border-border rounded-lg bg-background hover:bg-accent/50 cursor-pointer transition-colors flex justify-between items-center"
          onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
        >
          <span>
            {calendar === CalendarType.AD ? "Gregorian Calendar (AD)" : "Bikram Sambat (BS)"}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${showCalendarDropdown ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Custom Dropdown */}
        {showCalendarDropdown && (
          <div 
            ref={dropdownRef}
            className=" top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95"
          >
            <div 
              className={`p-3 hover:bg-accent cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg ${
                calendar === CalendarType.AD ? 'bg-accent' : ''
              }`}
              onClick={() => handleCalendarChange(CalendarType.AD)}
            >
              Gregorian Calendar (AD)
            </div>
            <div 
              className={`p-3 hover:bg-accent cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg ${
                calendar === CalendarType.BS ? 'bg-accent' : ''
              }`}
              onClick={() => handleCalendarChange(CalendarType.BS)}
            >
              Bikram Sambat (BS)
            </div>
          </div>
        )}
      </div>

      {/* Birth Date */}
      <CalendarSelect
        value={birthDate || undefined}
        onChange={setBirthDate}
        calendarType={calendar}
        label="Birth Date"
        placeholder="Select your birth date"
        maxDate={new Date()} 
      />

      {/* Calculate Button */}
      <EnhancedButton
        onClick={() => birthDate && compute(birthDate)}
        className="w-full"
        disabled={!birthDate}
        icon={<Calculator className="w-4 h-4" />}
      >
        Calculate Age
      </EnhancedButton>

      {/* Enhanced Result Modal */}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={<span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Your Age Calculation</span>}
        description={"Here's your detailed age breakdown based on your birth date."}
        size="sm"
        className="sm:max-w-md"
        footer={
          <DialogActionButton
            variant="outline"
            onClick={() => setOpen(false)}
            icon={<X className="w-4 h-4" />}
          >
            Close
          </DialogActionButton>
        }
      >
        <AppToaster />

        {result && (
          <div className="space-y-6">
            {/* Main Age Display */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">{result.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">{result.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">{result.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Detailed Breakdown</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between p-2 bg-muted/50 rounded">
                  <span className="text-muted-foreground">Total Days:</span>
                  <span className="font-medium">{result.totalDays.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/50 rounded">
                  <span className="text-muted-foreground">Total Weeks:</span>
                  <span className="font-medium">{result.totalWeeks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/50 rounded">
                  <span className="text-muted-foreground">Total Months:</span>
                  <span className="font-medium">{result.totalMonths}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/50 rounded">
                  <span className="text-muted-foreground">Next Birthday:</span>
                  <span className="font-medium text-primary">
                    {result.nextBirthday.daysUntil} days
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}