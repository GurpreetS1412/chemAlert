import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { productsData } from "@/data/products"

export default function CategoriesPage() {
  // Get categories with counts and stats
  const categories = [
    {
      id: "personal-care",
      name: "Personal Care Products",
      description: "Soaps, shampoos, toothpaste, skincare products and daily hygiene essentials",
      icon: "🧴",
      productCount: productsData.filter((p) => p.category === "personal-care").length,
      highRiskCount: productsData.filter((p) => p.category === "personal-care" && p.riskLevel === "High").length,
      gradient: "from-blue-500 to-cyan-500",
      examples: ["Face wash", "Shampoo", "Toothpaste", "Soap"],
    },
    {
      id: "food-beverages",
      name: "Food & Beverages",
      description: "Packaged foods, drinks, snacks and processed food items",
      icon: "🍕",
      productCount: productsData.filter((p) => p.category === "food-beverages").length,
      highRiskCount: productsData.filter((p) => p.category === "food-beverages" && p.riskLevel === "High").length,
      gradient: "from-orange-500 to-red-500",
      examples: ["Instant noodles", "Soft drinks", "Snacks", "Biscuits"],
    },
    {
      id: "household",
      name: "Household Products",
      description: "Cleaning supplies, detergents, disinfectants and home maintenance products",
      icon: "🧽",
      productCount: productsData.filter((p) => p.category === "household").length,
      highRiskCount: productsData.filter((p) => p.category === "household" && p.riskLevel === "High").length,
      gradient: "from-purple-500 to-pink-500",
      examples: ["Detergent", "Floor cleaner", "Toilet cleaner", "Insecticide"],
    },
    {
      id: "cosmetics",
      name: "Cosmetics",
      description: "Makeup, beauty creams, hair colors and personal grooming products",
      icon: "💄",
      productCount: productsData.filter((p) => p.category === "cosmetics").length,
      highRiskCount: productsData.filter((p) => p.category === "cosmetics" && p.riskLevel === "High").length,
      gradient: "from-pink-500 to-rose-500",
      examples: ["Foundation", "Lipstick", "Hair color", "Face cream"],
    },
  ]

  const totalProducts = productsData.length
  const totalHighRisk = productsData.filter((p) => p.riskLevel === "High").length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Categories</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore our comprehensive database of products organized by category. Each category contains detailed
                chemical analysis and safety information.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalProducts}+</div>
                  <div className="text-sm text-muted-foreground">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">{totalHighRisk}</div>
                  <div className="text-sm text-muted-foreground">High Risk Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">4</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <Card
                  key={category.id}
                  className="group card-hover border-2 hover:border-primary/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{category.productCount}</div>
                        <div className="text-xs text-muted-foreground">Products</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Risk Assessment:</span>
                        <Badge variant="destructive" className="text-xs">
                          {category.highRiskCount} High Risk
                        </Badge>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Popular Products:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.examples.map((example, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button asChild className="w-full group/btn">
                          <Link href={`/category/${category.id}`}>
                            Explore Category
                            <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Category Insights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="text-center p-6 rounded-lg bg-background shadow-sm">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-lg font-semibold mb-1">{category.name.split(" ")[0]}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{category.productCount}</div>
                    <div className="text-sm text-muted-foreground">Products analyzed</div>
                    <div className="mt-2">
                      <Badge variant={category.highRiskCount > 5 ? "destructive" : "secondary"} className="text-xs">
                        {category.highRiskCount} High Risk
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4" />
                Growing Database
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Can't Find a Product?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Help us expand our database by adding products you use daily. Your contribution helps millions of
                Indians make safer choices.
              </p>
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/add-product">Add a Product</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
