"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  loading?: boolean
  children: React.ReactNode
}

export function EnhancedButton({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 transition-all duration-200 font-medium"
  
  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-12 px-8 text-lg"
  }

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }

  return (
    <Button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  )
}

export function DialogActionButton({
  variant = 'primary',
  icon,
  onClick,
  children,
  ...props
}: EnhancedButtonProps) {
  return (
    <EnhancedButton
      variant={variant}
      icon={icon}
      onClick={onClick}
      className="w-full"
      {...props}
    >
      {children}
    </EnhancedButton>
  )
}