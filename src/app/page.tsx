"use client"

import { QuickCalculator } from "@/components/common/calculators/QuickCalculator"
import { MdTrendingUp, MdCake, MdAccountBalance } from "react-icons/md"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative text-center py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <motion.div
          className="relative max-w-3xl mx-auto px-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            InterestCalc
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-2">
            Smart calculators with both Gregorian (AD) and Bikram Sambat (BS) calendar support
          </p>
          <p className="text-sm text-muted-foreground">
            Calculate compound interest, determine exact age, and compute bank interest with precision
          </p>
        </motion.div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="py-6 px-3">
        <div className="max-w-5xl mx-auto text-center mb-6">
          <motion.h2
            className="text-xl md:text-2xl font-semibold mb-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            Choose Your Calculator
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Select from our specialized financial and utility tools
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <QuickCalculator
            icon={<MdTrendingUp className="h-6 w-6 text-primary" />}
            title="Compound Interest"
            description="Calculate investment growth with compound interest"
            type="compound"
          />
          <QuickCalculator
            icon={<MdCake className="h-6 w-6 text-primary" />}
            title="Age Calculator"
            description="Find your exact age in years, months, and days"
            type="age"
          />
          <QuickCalculator
            icon={<MdAccountBalance className="h-6 w-6 text-primary" />}
            title="Bank Interest"
            description="Compute simple interest for savings and loans"
            type="bank"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-6 bg-muted/30 px-3">
        <div className="max-w-5xl mx-auto text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-1">Why Choose InterestCalc?</h2>
          <p className="text-sm text-muted-foreground">
            Accuracy, simplicity, and flexibility — all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            {
              icon: "🗓️",
              title: "Dual Calendar Support",
              desc: "Works with both AD and BS calendars",
            },
            {
              icon: "⚡",
              title: "Fast & Accurate",
              desc: "Instant calculations with optimized algorithms",
            },
            {
              icon: "📱",
              title: "Responsive Design",
              desc: "Perfect experience on all devices",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-4 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg">{feature.icon}</span>
              </div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground border-t">
        © {new Date().getFullYear()} InterestCalc — All rights reserved.
      </footer>
    </div>
  )
}
