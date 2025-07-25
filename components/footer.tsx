import Link from "next/link"
import { AlertTriangle, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">ChemAlert India</h2>
                <p className="text-sm text-muted-foreground">Know what's in your products</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering Indian consumers with knowledge about product safety. This information is for educational
              purposes only.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/add-product" className="text-muted-foreground hover:text-primary">
                  Add Product
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/personal-care" className="text-muted-foreground hover:text-primary">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/category/food-beverages" className="text-muted-foreground hover:text-primary">
                  Food & Beverages
                </Link>
              </li>
              <li>
                <Link href="/category/household" className="text-muted-foreground hover:text-primary">
                  Household Products
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics" className="text-muted-foreground hover:text-primary">
                  Cosmetics
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 ChemAlert India. Educational content for awareness purposes.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link href="/terms" className="hover:text-primary">
              Terms of Use
            </Link>{" "}
            •{" "}
            <Link href="/disclaimer" className="hover:text-primary">
              Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
