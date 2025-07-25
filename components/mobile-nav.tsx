"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Menu className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary transition-colors py-2 px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="text-lg font-medium hover:text-primary transition-colors py-2 px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/products"
            className="text-lg font-medium hover:text-primary transition-colors py-2 px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium hover:text-primary transition-colors py-2 px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/add-product"
            className="text-lg font-medium hover:text-primary transition-colors py-2 px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(false)}
          >
            Add Product
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
