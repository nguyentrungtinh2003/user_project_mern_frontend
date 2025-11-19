import { ArrowRight, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { Badge } from "../ui/badge"

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden py-20 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <Badge variant="secondary" className="px-4 py-1">
                        <Zap className="w-3 h-3 mr-2" />
                        Trusted by 10,000+ teams worldwide
                    </Badge>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-3xl mx-auto">
                        Project Management
                        <span className="block text-primary mt-2">Made Simple</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Streamline your workflow, collaborate seamlessly, and deliver projects on time.
                        The all-in-one platform your team will love.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="text-lg px-8" asChild>
                            <Link to="auth/register">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                            <Link to="auth/login">
                                Login
                            </Link>
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        No credit card required • Free forever • Setup in 2 minutes
                    </p>
                </div>
            </div>
        </section>
    )
}

export default HeroSection