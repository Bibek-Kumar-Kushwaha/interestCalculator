// lib/calculator.ts
import { CompoundInterestFormData, CalculationResult } from "./types"


export function calculateCompoundInterest(data: CompoundInterestFormData): CalculationResult {
  const { principal, rate, startDate, endDate } = data
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffMs = end.getTime() - start.getTime()
  const durationDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))

  // approximate years fraction
  const years = durationDays / 365.0

  const r = rate / 100

  // assume yearly compounding for simplicity
  const totalAmount = principal * Math.pow(1 + r, years)
  const interestAmount = totalAmount - principal

  return {
    totalAmount,
    interestAmount,
    principal,
    durationDays,
    compoundingPeriods: Math.round(years),
  }
}

/* simple bank interest (simple interest) */
export function calculateBankInterestSimple(principal: number, ratePercent: number, days: number, yearDays = 365) {
  const interest = (principal * ratePercent * days) / (100 * yearDays)
  return {
    interest,
    total: principal + interest
  }
}
