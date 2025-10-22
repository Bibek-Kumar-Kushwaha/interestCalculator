"use client"

import { Toaster, toast as sonnerToast } from "sonner"
import React from "react"

export function AppToaster() {
  return <Toaster position="top-right" richColors />
}

export function showError(message: string) {
  sonnerToast.error(message)
}

export function showSuccess(message: string) {
  sonnerToast.success(message)
}

export default sonnerToast
