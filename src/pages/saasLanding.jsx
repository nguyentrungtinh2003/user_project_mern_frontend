import {
    CTASection,
    FeaturesSection,
    Footer,
    HeroSection,
    Navigation,
    PricingSection,
    ProductSreenshortsSection,
    TestimonialsSection
} from "../components/landing/Index";

const Landing = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <Navigation />
            {/* Hero section */}
            <HeroSection />
            {/* Product Sreenshorts Section */}
            <ProductSreenshortsSection />
            {/* Features Section */}
            <FeaturesSection />
            {/* Pricing Setion */}
            <PricingSection />
            {/* Testimonials Section */}
            <TestimonialsSection />
            {/* CTA Section */}
            <CTASection />
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Landing