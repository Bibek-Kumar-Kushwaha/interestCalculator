// components/common/Navbar.tsx
"use client";
import Link from "next/link";
import { MdCalculate } from "react-icons/md";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-md">
            <MdCalculate className="h-8 w-8 text-primary" />
          </div>

          <div>
            <div className="font-bold">InterestCalc</div>
            <div className="text-xs text-muted-foreground">
              Smart Calculator
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="#calculators" className="text-sm hover:text-primary">
            Calculators
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
