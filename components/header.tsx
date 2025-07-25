"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Search } from "@/components/search"
import { useEffect, useState } from "react"

export function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ChemAlert India</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Know what's in your products</p>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-1"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-1"
            >
              Categories
            </Link>
            <Link
              href="/products"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-1"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-1"
            >
              About
            </Link>
            <Link
              href="/add-product"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-1"
            >
              Add Product
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {mounted && <Search />}
            <ThemeToggle />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          {mounted && <Search />}
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
