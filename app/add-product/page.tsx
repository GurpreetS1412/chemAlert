"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Upload, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AddProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [chemicals, setChemicals] = useState<string[]>([])
  const [newChemical, setNewChemical] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleAddChemical = () => {
    if (newChemical.trim() && !chemicals.includes(newChemical.trim())) {
      setChemicals([...chemicals, newChemical.trim()])
      setNewChemical("")
    }
  }

  const handleRemoveChemical = (index: number) => {
    setChemicals(chemicals.filter((_, i) => i !== index))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      // Reset form or redirect
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Add a Product</h1>
            <p className="text-muted-foreground">
              Help our community by adding information about harmful chemicals in products
            </p>
          </div>

          {success ? (
            <Alert className="mb-8 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
              <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Thank you for your contribution! Your product submission has been received and will be reviewed by our
                team.
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Please provide accurate information about the product and its ingredients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" placeholder="e.g. Neem Face Wash" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand Name</Label>
                      <Input id="brand" placeholder="e.g. Himalaya" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal-care">Personal Care</SelectItem>
                        <SelectItem value="food-beverages">Food & Beverages</SelectItem>
                        <SelectItem value="household">Household Products</SelectItem>
                        <SelectItem value="cosmetics">Cosmetics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the product, its purpose, and any claims made by the manufacturer"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Harmful Chemicals</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newChemical}
                        onChange={(e) => setNewChemical(e.target.value)}
                        placeholder="e.g. Sodium Lauryl Sulfate"
                      />
                      <Button type="button" onClick={handleAddChemical} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {chemicals.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {chemicals.map((chemical, index) => (
                          <div key={index} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                            <span>{chemical}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveChemical(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No chemicals added yet</p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label htmlFor="image">Product Image</Label>
                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                      <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                      <label htmlFor="image" className="cursor-pointer text-center">
                        {imagePreview ? (
                          <div className="space-y-2">
                            <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-lg">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Product preview"
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">Click to change image</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Upload product image</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Product"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
