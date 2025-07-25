import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertTriangle, Info, Share2, Bookmark, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react"
import { productsData } from "@/data/products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = productsData.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  // Get similar products (same category, excluding current product)
  const similarProducts = productsData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Product Header */}
        <section className="border-b">
          <div className="container py-4">
            <div className="flex items-center gap-4">
              <Link href={`/category/${product.category}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Category
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-8">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image & Basic Info */}
              <div>
                <div className="aspect-square relative mb-6 bg-muted rounded-lg overflow-hidden shadow-sm">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <Badge
                    variant={
                      product.riskLevel === "High"
                        ? "destructive"
                        : product.riskLevel === "Medium"
                          ? "secondary"
                          : "outline"
                    }
                    className="absolute top-4 right-4"
                  >
                    {product.riskLevel} Risk
                  </Badge>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 ml-auto bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    Official Website
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary mt-1">
                          {product.brand}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium capitalize">{product.category.replace("-", " ")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Chemicals Found</p>
                        <p className="font-medium">{product.harmfulChemicals.length}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <p
                          className={`font-medium ${
                            product.riskLevel === "High"
                              ? "text-destructive"
                              : product.riskLevel === "Medium"
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        >
                          {product.riskLevel}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium">June 15, 2024</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Was this information helpful?</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <ThumbsUp className="h-4 w-4" />
                        Yes
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <ThumbsDown className="h-4 w-4" />
                        No
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Chemical Analysis */}
              <div className="space-y-6">
                <Tabs defaultValue="chemicals">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="chemicals">Chemicals</TabsTrigger>
                    <TabsTrigger value="health">Health Effects</TabsTrigger>
                    <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chemicals" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          Harmful Chemicals Detected
                        </CardTitle>
                        <CardDescription>
                          Potentially harmful ingredients found in this product based on label analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {product.harmfulChemicals.map((chemical, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-lg">{chemical}</h4>
                                <Badge variant="outline">{getChemicalRisk(chemical)}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{getChemicalDescription(chemical)}</p>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {getChemicalCategory(chemical)}
                                </Badge>
                                {getChemicalTags(chemical).map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                              Chemical Interaction Warning
                            </p>
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                              Some chemicals in this product may interact with each other, potentially increasing health
                              risks. The combination of {product.harmfulChemicals[0]} and{" "}
                              {product.harmfulChemicals[1] || "other chemicals"} may cause increased irritation.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="health" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Potential Health Effects</CardTitle>
                        <CardDescription>Possible health impacts from chemicals found in this product</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 pb-4 border-b">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                            <div>
                              <p className="font-medium mb-1">Skin Irritation</p>
                              <p className="text-sm text-muted-foreground">
                                Chemicals like {product.harmfulChemicals[0]} can cause redness, itching, and irritation,
                                especially for those with sensitive skin.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 pb-4 border-b">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                            <div>
                              <p className="font-medium mb-1">Allergic Reactions</p>
                              <p className="text-sm text-muted-foreground">
                                Some individuals may experience allergic reactions including rashes, hives, or breathing
                                difficulties.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 pb-4 border-b">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                            <div>
                              <p className="font-medium mb-1">Long-term Exposure Concerns</p>
                              <p className="text-sm text-muted-foreground">
                                Regular exposure to {product.harmfulChemicals[1] || "these chemicals"} may contribute to
                                hormone disruption and other systemic health issues.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                            <div>
                              <p className="font-medium mb-1">Environmental Impact</p>
                              <p className="text-sm text-muted-foreground">
                                These chemicals can enter waterways and harm aquatic life when washed down drains.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="h-5 w-5 text-blue-600" />
                          Health Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                            <p>Consider limiting use of this product, especially for children and pregnant women</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                            <p>Look for alternative products with fewer harmful chemicals</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                            <p>Always read ingredient labels before purchasing</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                            <p>If you experience any adverse reactions, discontinue use immediately</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="alternatives" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Safer Alternatives</CardTitle>
                        <CardDescription>Products with fewer harmful chemicals</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {similarProducts.slice(0, 2).map((altProduct) => (
                            <div key={altProduct.id} className="flex gap-4 pb-4 border-b">
                              <div className="w-16 h-16 relative rounded overflow-hidden shrink-0">
                                <Image
                                  src={altProduct.image || "/placeholder.svg"}
                                  alt={altProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium">{altProduct.name}</h4>
                                    <p className="text-sm text-primary">{altProduct.brand}</p>
                                  </div>
                                  <Badge
                                    variant={
                                      altProduct.riskLevel === "Low"
                                        ? "outline"
                                        : altProduct.riskLevel === "Medium"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                    className="text-xs"
                                  >
                                    {altProduct.riskLevel} Risk
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <Link
                                    href={`/product/${altProduct.id}`}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    View Details →
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-start gap-3 pt-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                              <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium mb-1">Natural Alternatives</p>
                              <p className="text-sm text-muted-foreground mb-3">
                                Consider these natural alternatives to replace this product:
                              </p>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Use coconut oil as a natural moisturizer</li>
                                <li>Try aloe vera gel for skin soothing properties</li>
                                <li>Consider products with certified organic ingredients</li>
                                <li>Look for products with transparent ingredient lists</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Disclaimer</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400">
                          This information is for educational purposes only and should not replace professional medical
                          advice. Consult healthcare providers for specific concerns. Product formulations may change
                          over time, so always check current ingredient lists.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    <Badge
                      variant={
                        product.riskLevel === "High"
                          ? "destructive"
                          : product.riskLevel === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="absolute top-3 right-3"
                    >
                      {product.riskLevel} Risk
                    </Badge>
                  </div>
                  <CardContent className="py-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{product.brand}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.harmfulChemicals.slice(0, 2).map((chemical, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {chemical}
                        </Badge>
                      ))}
                      {product.harmfulChemicals.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.harmfulChemicals.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <Button asChild className="w-full" size="sm">
                      <Link href={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function getChemicalDescription(chemical: string): string {
  const descriptions: Record<string, string> = {
    "Sodium Lauryl Sulfate":
      "A harsh detergent and surfactant that can cause skin and eye irritation, and may disrupt skin barrier function. Often used to create lather in personal care products.",
    Parabens:
      "Preservatives (including methylparaben, propylparaben, butylparaben) that can mimic estrogen and may disrupt hormonal balance in the body. Used to extend product shelf life.",
    Triclosan:
      "An antimicrobial agent linked to antibiotic resistance and potential hormonal disruption. Commonly found in antibacterial soaps and toothpastes.",
    "Artificial Colors":
      "Synthetic dyes (like FD&C Blue 1, Red 40) that may cause allergic reactions and hyperactivity in children. Used to make products visually appealing.",
    MSG: "Flavor enhancer (monosodium glutamate) that can cause headaches, nausea, and other symptoms in sensitive individuals. Common in processed foods.",
    "Trans Fats":
      "Artificial fats that increase bad cholesterol and risk of heart disease. Often found in processed and fried foods.",
    "Sodium Benzoate":
      "Preservative that can form benzene (a carcinogen) when combined with vitamin C. Used to prevent bacterial growth in acidic foods and beverages.",
    Phosphates:
      "Can cause skin irritation and contribute to environmental water pollution. Found in many cleaning products and detergents.",
    "Chlorine Bleach":
      "Strong chemical that can cause respiratory irritation and skin burns. Common in household cleaners and disinfectants.",
    Ammonia: "Toxic gas that can cause severe respiratory and skin irritation. Used in many household cleaners.",
    Formaldehyde:
      "Known carcinogen that can cause allergic reactions and respiratory issues. Found in some cosmetics and household products.",
    Lead: "Heavy metal that can cause neurological damage, especially in children. May be found in some cosmetics and older products.",
    Mercury: "Toxic metal that can damage the nervous system and kidneys. Sometimes found in skin lightening creams.",
    Phthalates: "Endocrine disruptors that may affect reproductive development. Often used in plastics and fragrances.",
    BHA: "Butylated hydroxyanisole is a preservative that may cause endocrine disruption and is potentially carcinogenic.",
    BHT: "Butylated hydroxytoluene is a preservative with potential endocrine disrupting properties.",
    "Propylene Glycol": "A penetration enhancer that may cause skin irritation in some individuals.",
  }
  return descriptions[chemical] || "Potentially harmful chemical compound that may cause adverse health effects."
}

function getChemicalRisk(chemical: string): string {
  const highRisk = ["Formaldehyde", "Lead", "Mercury", "Trans Fats", "Phthalates"]
  const mediumRisk = ["Parabens", "Triclosan", "MSG", "Chlorine Bleach", "Ammonia", "BHA", "BHT"]

  if (highRisk.includes(chemical)) return "High Risk"
  if (mediumRisk.includes(chemical)) return "Medium Risk"
  return "Low Risk"
}

function getChemicalCategory(chemical: string): string {
  const categories: Record<string, string> = {
    "Sodium Lauryl Sulfate": "Detergent",
    Parabens: "Preservative",
    Triclosan: "Antimicrobial",
    "Artificial Colors": "Colorant",
    MSG: "Flavor Enhancer",
    "Trans Fats": "Fat",
    "Sodium Benzoate": "Preservative",
    Phosphates: "Detergent",
    "Chlorine Bleach": "Disinfectant",
    Ammonia: "Cleaner",
    Formaldehyde: "Preservative",
    Lead: "Heavy Metal",
    Mercury: "Heavy Metal",
    Phthalates: "Plasticizer",
    BHA: "Preservative",
    BHT: "Preservative",
    "Propylene Glycol": "Humectant",
  }
  return categories[chemical] || "Chemical"
}

function getChemicalTags(chemical: string): string[] {
  const tags: Record<string, string[]> = {
    "Sodium Lauryl Sulfate": ["Skin Irritant", "Foaming Agent"],
    Parabens: ["Endocrine Disruptor", "Preservative"],
    Triclosan: ["Antibacterial", "Environmental Toxin"],
    "Artificial Colors": ["Allergen", "Petroleum-derived"],
    MSG: ["Neurotoxin", "Flavor Enhancer"],
    "Trans Fats": ["Heart Disease", "Processed Food"],
    "Sodium Benzoate": ["Potential Carcinogen", "Preservative"],
    Phosphates: ["Water Pollutant", "Cleaning Agent"],
    "Chlorine Bleach": ["Respiratory Irritant", "Corrosive"],
    Ammonia: ["Respiratory Irritant", "Corrosive"],
    Formaldehyde: ["Carcinogen", "Preservative"],
    Lead: ["Neurotoxin", "Heavy Metal"],
    Mercury: ["Neurotoxin", "Heavy Metal"],
    Phthalates: ["Endocrine Disruptor", "Fragrance"],
    BHA: ["Potential Carcinogen", "Antioxidant"],
    BHT: ["Potential Carcinogen", "Antioxidant"],
    "Propylene Glycol": ["Penetration Enhancer", "Humectant"],
  }
  return tags[chemical] || ["Harmful Chemical"]
}
