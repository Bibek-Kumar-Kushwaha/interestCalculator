"use client"

import Link from "next/link"
import { MdCalculate } from "react-icons/md"
import { FaGithub, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"

export function Footer() {

  return (
    <footer className="border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Logo + Name */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 border border-primary/20 rounded-md">
              <MdCalculate className="text-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-lg">InterestCalc</span>
          </Link>

          {/* Center: Nav Links */}
          {/* <nav className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/#calculators"
              className="hover:text-primary transition-colors"
            >
              Calculators
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav> */}

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/Bibek-Kumar-Kushwaha/"
              target="_blank"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link
              href="https://np.linkedin.com/in/bibek-kumar-kushwaha-993942280/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/bibekkumarkush3/"
              target="_blank"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.facebook.com/bibek.kushwaha.01/"
              target="_blank"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaFacebook className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Divider line */}
        <div className="mt-6 border-t border-border/50" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground mt-4 gap-2 text-center">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">
              InterestCalc
            </span>{" "}
            — All rights reserved.
          </p>
          <p>
            Built by{" "} ❤️ {" "}
            <span className="text-primary font-medium">
              Bibek Kumar Kushwaha
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
