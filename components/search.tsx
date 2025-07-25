"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { productsData } from "@/data/products"

export function Search() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9 bg-transparent" disabled>
        <SearchIcon className="h-4 w-4" />
      </Button>
    )
  }

  const filteredProducts = productsData.filter((product) => {
    const searchTerm = query.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.harmfulChemicals.some((chemical) => chemical.toLowerCase().includes(searchTerm))
    )
  })

  const handleSelect = (productId: string) => {
    setOpen(false)
    setQuery("")
    router.push(`/product/${productId}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9 bg-transparent" aria-label="Search products">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, brands, or chemicals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {query && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 10).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleSelect(product.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-muted-foreground">{product.brand}</span>
                    </div>
                    <Badge
                      variant={
                        product.riskLevel === "High"
                          ? "destructive"
                          : product.riskLevel === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {product.riskLevel}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No products found for "{query}"</div>
              )}
            </div>
          )}

          {!query && (
            <div className="text-center py-8 text-muted-foreground">
              Start typing to search products, brands, or chemicals...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
