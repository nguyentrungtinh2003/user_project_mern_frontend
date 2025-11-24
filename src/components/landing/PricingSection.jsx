import { CheckCircle2 } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { pricingPlans } from "./landingInfo"
import { Button } from "../ui/button"
import { Link } from "react-router"

const PricingSection = () => {
    return (
        <section id="pricing" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <Badge variant="outline">Pricing</Badge>
                        <h2 className="text-3xl md:text-4xl">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choose the perfect plan for your team. No hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <Badge className="px-6 py-1">Most Popular</Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-4xl">{plan.price}</span>
                                        {plan.price !== 'Custom' && <span className="text-muted-foreground"> / month</span>}
                                    </div>
                                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={plan.popular ? 'default' : 'outline'}
                                        asChild
                                    >
                                        <Link to="auth/register">{plan.cta}</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PricingSection