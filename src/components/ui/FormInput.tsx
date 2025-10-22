"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  helperText?: string
}

export function FormInput({
  label,
  error,
  helperText,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      
      <Input
        className={cn(
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}