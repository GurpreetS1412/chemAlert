import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  BookOpen,
  ChevronRight,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  Star,
  Award,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { productsData } from "@/data/products"

export default function HomePage() {
  // Get featured products (first 8)
  const featuredProducts = productsData.slice(0, 8)

  // Get categories with counts
  const categories = [
    {
      id: "personal-care",
      name: "Personal Care",
      description: "Soaps, shampoos, toothpaste and skincare products",
      icon: "🧴",
      productCount: productsData.filter((p) => p.category === "personal-care").length,
      riskLevel: "Medium",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "food-beverages",
      name: "Food & Beverages",
      description: "Packaged foods, drinks and snacks",
      icon: "🍕",
      productCount: productsData.filter((p) => p.category === "food-beverages").length,
      riskLevel: "High",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "household",
      name: "Household Products",
      description: "Cleaning supplies and detergents",
      icon: "🧽",
      productCount: productsData.filter((p) => p.category === "household").length,
      riskLevel: "High",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "cosmetics",
      name: "Cosmetics",
      description: "Makeup, creams and beauty products",
      icon: "💄",
      productCount: productsData.filter((p) => p.category === "cosmetics").length,
      riskLevel: "Medium",
      gradient: "from-pink-500 to-rose-500",
    },
  ]

  const stats = [
    {
      value: productsData.length,
      label: "Products Analyzed",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      value: Array.from(new Set(productsData.flatMap((p) => p.harmfulChemicals))).length,
      label: "Chemicals Identified",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      value: Array.from(new Set(productsData.map((p) => p.brand))).length,
      label: "Indian Brands Covered",
      icon: Award,
      color: "text-green-500",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 amoled:from-red-950/10 amoled:via-orange-950/10 amoled:to-yellow-950/10" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/30 amoled:bg-red-950/50 text-red-700 dark:text-red-300 amoled:text-red-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="h-4 w-4" />
              Know What's Inside Your Products
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Discover Hidden
              <span className="gradient-text block mt-2">Chemicals</span>
              <span className="text-3xl md:text-4xl lg:text-5xl block mt-4 text-muted-foreground font-normal">
                in Indian Products
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Make informed choices for you and your family's health with our comprehensive database of harmful
              chemicals in everyday products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/categories">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Products
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full glass bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Shield, text: "Science-Based", color: "text-green-500" },
                { icon: Users, text: "Community Driven", color: "text-blue-500" },
                { icon: BookOpen, text: "Educational", color: "text-purple-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 glass px-6 py-3 rounded-full animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-lg mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}+</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse products by category to find detailed information about harmful chemicals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/category/${category.id}`} className="group">
                <Card
                  className="h-full card-hover border-2 hover:border-primary/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative mb-6">
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground font-medium">
                        {category.productCount} products
                      </span>
                      <Badge
                        className={`text-xs ${
                          category.riskLevel === "High"
                            ? "risk-high"
                            : category.riskLevel === "Medium"
                              ? "risk-medium"
                              : "risk-low"
                        }`}
                      >
                        {category.riskLevel} Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
                      View Products
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl text-muted-foreground">Popular products with detailed chemical analysis</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/products" className="gap-2">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group card-hover overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
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
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm">{product.brand}</p>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 dark:from-red-500/5 dark:via-orange-500/5 dark:to-yellow-500/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Join Our Community
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">Help Build a Safer Future</h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Know about a product with harmful chemicals? Contribute to our database and help millions of Indians make
              informed choices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/add-product">Add a Product</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full glass bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
