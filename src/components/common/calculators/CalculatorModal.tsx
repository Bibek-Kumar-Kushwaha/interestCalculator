// components/calculators/CalculatorModal.tsx
"use client"
import React, { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AgeCalculator } from "./AgeCalculator"
import { CompoundInterestCalculator } from "./CompoundInterestCalculator"
import { BankInterestCalculator } from "./BankInterestCalculator"

type CalculatorType = "age"|"compound"|"bank"

export function CalculatorModal({ title, description, type, trigger }: {
  title: string
  description: string
  type: CalculatorType
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<unknown | null>(null)

  function handleCalculationComplete(calculationResult: unknown) {
    setResult(calculationResult)
  }

  function render(){
    if(type === "age") return <AgeCalculator />
    if(type === "compound") return <CompoundInterestCalculator onCalculationComplete={handleCalculationComplete} />
    if(type === "bank") return <BankInterestCalculator onCalculationComplete={handleCalculationComplete} />
    return null
  }

  // Reset result when modal opens/closes
  React.useEffect(() => {
    if (!open) {
      setResult(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        {/* Calculator Content */}
        <div className="mt-6">
          {render()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
