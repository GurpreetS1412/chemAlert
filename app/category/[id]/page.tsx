import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, ExternalLink } from "lucide-react"
import { productsData } from "@/data/products"

interface CategoryPageProps {
  params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params
  const categoryProducts = productsData.filter((product) => product.category === id)

  const categoryNames: Record<string, string> = {
    "personal-care": "Personal Care Products",
    "food-beverages": "Food & Beverages",
    household: "Household Products",
    cosmetics: "Cosmetics",
  }

  const categoryName = categoryNames[id] || "Products"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className=" shadow-sm  border-b border-border text-orange-200 sticky top-0   backdrop-filter backdrop-blur-lg bg-opacity-30 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h1 className="text-xl font-bold text-primary">
                ChemAlert India
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-primary mb-2">
            {categoryName}
          </h2>
          <p className="text-gray-700">
            {categoryProducts.length} products analyzed for harmful chemicals
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="aspect-square relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-lg leading-tight">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-blue-600">
                        {product.brand}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        product.riskLevel === "High"
                          ? "destructive"
                          : product.riskLevel === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs shrink-0">
                      {product.riskLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Harmful Chemicals Found:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {product.harmfulChemicals
                          .slice(0, 3)
                          .map((chemical, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs">
                              {chemical}
                            </Badge>
                          ))}
                        {product.harmfulChemicals.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.harmfulChemicals.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <Button className="w-full" size="sm">
                        View Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
