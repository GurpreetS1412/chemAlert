import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChemAlert India - Know What's in Your Products",
  description: "Discover harmful chemicals in everyday Indian products and make informed choices for your health.",
  keywords: ["chemicals", "products", "health", "safety", "India", "harmful", "ingredients"],
  authors: [{ name: "ChemAlert India" }],
  openGraph: {
    title: "ChemAlert India - Know What's in Your Products",
    description: "Discover harmful chemicals in everyday Indian products and make informed choices for your health.",
    type: "website",
    locale: "en_IN",
    siteName: "ChemAlert India",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChemAlert India - Know What's in Your Products",
    description: "Discover harmful chemicals in everyday Indian products and make informed choices for your health.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
