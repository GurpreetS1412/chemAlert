import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  BookOpen,
  Target,
  Heart,
  Award,
  AlertTriangle,
  TrendingUp,
  Globe,
  CheckCircle,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { productsData } from "@/data/products"

export default function AboutPage() {
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
    {
      value: "1M+",
      label: "Lives Impacted",
      icon: Heart,
      color: "text-pink-500",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Science-Based Analysis",
      description: "Our chemical analysis is based on peer-reviewed research and international safety standards.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Users contribute product information and reviews.",
    },
    {
      icon: BookOpen,
      title: "Educational Focus",
      description: "We provide detailed information to help you understand the impact of chemicals on your health.",
    },
    {
      icon: Globe,
      title: "India-Specific",
      description: "Focused on products available in the Indian market with local brand coverage.",
    },
  ]

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Chemical Safety Expert",
      description: "PhD in Chemistry with 15+ years in product safety research.",
    },
    {
      name: "Rajesh Kumar",
      role: "Data Scientist",
      description: "Specializes in chemical database management and analysis algorithms.",
    },
    {
      name: "Anita Patel",
      role: "Public Health Advocate",
      description: "MPH with focus on consumer health and safety awareness campaigns.",
    },
    {
      name: "Vikram Singh",
      role: "Technology Lead",
      description: "Full-stack developer ensuring platform reliability and user experience.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle className="h-4 w-4" />
                Empowering Informed Choices
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                About
                <span className="gradient-text block mt-2">ChemAlert India</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
                We're on a mission to make product safety information accessible to every Indian consumer, helping
                families make informed choices about the products they use daily.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-b bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-lg mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Target className="h-4 w-4" />
                    Our Mission
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Making Product Safety Information Accessible to All
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    In India, millions of consumers use products daily without knowing about potentially harmful
                    chemicals they contain. We believe everyone deserves to know what's in their products and make
                    informed choices for their health and their family's wellbeing.
                  </p>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    ChemAlert India bridges this information gap by providing comprehensive, science-based analysis of
                    products commonly used in Indian households, from personal care items to food products.
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/products">Explore Our Database</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <Card key={index} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <feature.icon className={`h-8 w-8 text-primary mb-4`} />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How ChemAlert Works</h2>
              <p className="text-xl text-muted-foreground">
                Our systematic approach to product analysis ensures accurate and reliable information
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Research & Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We analyze product ingredients using scientific literature, regulatory databases, and safety studies
                  to identify potentially harmful chemicals.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Risk Assessment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each product receives a risk rating based on the concentration and toxicity of harmful chemicals,
                  following international safety standards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Community Verification</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our community of users and experts continuously verify and update product information to ensure
                  accuracy and relevance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">
                Experts in chemistry, public health, and technology working together for consumer safety
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in complete transparency about our methodology, sources, and any limitations in our data.
                </p>
              </Card>
              <Card className="p-8 text-center">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Scientific Integrity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All our analysis is based on peer-reviewed research and established scientific principles.
                </p>
              </Card>
              <Card className="p-8 text-center">
                <Heart className="h-12 w-12 text-pink-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Consumer First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every decision we make prioritizes the health and safety of consumers and their families.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Help us build a safer future for Indian consumers. Contribute product information, share your
                experiences, or spread awareness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/add-product">Add a Product</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/categories">Explore Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
