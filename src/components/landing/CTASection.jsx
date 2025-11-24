import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"

const CTASection = () => {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-xl opacity-90">
                        Join thousands of teams already using ProjectHub to deliver better projects, faster.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                            <Link to="auth/register">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
                            <Link to="auth/login">
                                View Demo
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CTASection