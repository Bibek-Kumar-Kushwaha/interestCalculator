// lib/types.ts
import { z } from "zod"

export enum CalendarType {
  AD = "AD",
  BS = "BS",
}

/* Compound interest form data */
export const compoundInterestSchema = z.object({
  principal: z.number().min(0),
  rate: z.number().min(0),
  startDate: z.date(),
  endDate: z.date(),
  calendarType: z.nativeEnum(CalendarType),
})
export type CompoundInterestFormData = z.infer<typeof compoundInterestSchema>

export type CalculationResult = {
  totalAmount: number
  interestAmount: number
  principal: number
  durationDays: number
  compoundingPeriods?: number
}

/* Age result for age calculator */
export type AgeResult = {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalMonths: number
  nextBirthday: {
    date: Date
    daysUntil: number
  }
}
