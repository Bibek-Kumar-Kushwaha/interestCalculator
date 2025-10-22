"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MdLightMode, MdDarkMode } from "react-icons/md"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Define the toggle order
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }

  const renderIcon = () => {
    if (theme === "light") return <MdLightMode className="h-5 w-5" />
    if (theme === "dark") return <MdDarkMode className="h-5 w-5" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-md bg-muted hover:bg-background transition-colors"
      aria-label="Toggle theme"
    >
      {renderIcon()}
    </button>
  )
}
