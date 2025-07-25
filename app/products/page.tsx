import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Filter, Search, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { productsData } from "@/data/products"

export default function ProductsPage() {
  // Get all products
  const allProducts = productsData

  // Get category counts
  const categoryStats = {
    "personal-care": productsData.filter((p) => p.category === "personal-care").length,
    "food-beverages": productsData.filter((p) => p.category === "food-beverages").length,
    household: productsData.filter((p) => p.category === "household").length,
    cosmetics: productsData.filter((p) => p.category === "cosmetics").length,
  }

  const riskStats = {
    High: productsData.filter((p) => p.riskLevel === "High").length,
    Medium: productsData.filter((p) => p.riskLevel === "Medium").length,
    Low: productsData.filter((p) => p.riskLevel === "Low").length,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">All Products</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Browse our complete database of {allProducts.length}+ products with detailed chemical analysis and
                safety information.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">{allProducts.length}</div>
                  <div className="text-sm text-muted-foreground">Total Products</div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-destructive">{riskStats.High}</div>
                  <div className="text-sm text-muted-foreground">High Risk</div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-amber-600">{riskStats.Medium}</div>
                  <div className="text-sm text-muted-foreground">Medium Risk</div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{riskStats.Low}</div>
                  <div className="text-sm text-muted-foreground">Low Risk</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b bg-background/50">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products, brands, or chemicals..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="personal-care">Personal Care ({categoryStats["personal-care"]})</SelectItem>
                    <SelectItem value="food-beverages">Food & Beverages ({categoryStats["food-beverages"]})</SelectItem>
                    <SelectItem value="household">Household ({categoryStats.household})</SelectItem>
                    <SelectItem value="cosmetics">Cosmetics ({categoryStats.cosmetics})</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk ({riskStats.High})</SelectItem>
                    <SelectItem value="medium">Medium Risk ({riskStats.Medium})</SelectItem>
                    <SelectItem value="low">Low Risk ({riskStats.Low})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">All Products</h2>
                <p className="text-muted-foreground">Showing {allProducts.length} products</p>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="risk-high">Risk Level (High to Low)</SelectItem>
                  <SelectItem value="risk-low">Risk Level (Low to High)</SelectItem>
                  <SelectItem value="brand">Brand (A-Z)</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="product-grid">
              {allProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group card-hover overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(index % 20) * 0.05}s` }}
                >
                  <div className="aspect-square relative bg-muted overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=400"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        product.riskLevel === "High"
                          ? "risk-high"
                          : product.riskLevel === "Medium"
                            ? "risk-medium"
                            : "risk-low"
                      }`}
                    >
                      {product.riskLevel} Risk
                    </Badge>
                    {product.rating && (
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                          <Star className="h-3 w-3 fill-current" />
                          {product.rating}
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-primary font-semibold text-sm">{product.brand}</p>
                      <Badge variant="outline" className="text-xs mt-1 capitalize">
                        {product.category.replace("-", " ")}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Harmful Chemicals:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.harmfulChemicals.slice(0, 2).map((chemical, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {chemical}
                            </Badge>
                          ))}
                          {product.harmfulChemicals.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.harmfulChemicals.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {product.price && <span className="text-sm font-medium text-green-600">{product.price}</span>}
                        {product.reviews && (
                          <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
                        )}
                      </div>

                      <Button asChild className="w-full group/btn">
                        <Link href={`/product/${product.id}`}>
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Load More Products
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
