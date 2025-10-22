// components/calculators/QuickCalculator.tsx
"use client"
import React from "react"
import { CalculatorModal } from "./CalculatorModal"

type CalculatorType = "age"|"compound"|"bank"

export function QuickCalculator({ icon, title, description, type, buttonText = "Calculate" } : {
  icon: React.ReactNode
  title: string
  description: string
  type: CalculatorType
  buttonText?: string
}) {
  return (
    <CalculatorModal
      title={title}
      description={description}
      type={type}
      trigger={
        <div className="group p-6 rounded-xl border bg-card hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 border border-primary/10">
              {icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
          
          <div className="mt-6">
            <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200 shadow-sm hover:shadow-md">
              {buttonText} 
            </button>
          </div>
        </div>
      }
    />
  )
}
