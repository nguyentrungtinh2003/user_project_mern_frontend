import { BarChart3, FolderKanban } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import { ImageWithFallback } from "../ui/image"

const ProductSreenshortsSection = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <Badge variant="outline">Product Overview</Badge>
                        <h2 className="text-3xl md:text-4xl">See It In Action</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to manage projects, from planning to delivery
                        </p>
                    </div>

                    {/* Main Screenshot */}
                    <div className="rounded-xl overflow-hidden shadow-2xl border bg-background mb-8">
                        <ImageWithFallback
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
                            alt="Dashboard Overview"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Feature Screenshots Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="overflow-hidden">
                            <div className="p-4">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <FolderKanban className="h-5 w-5 text-purple-500" />
                                    Kanban Boards
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Visualize your workflow with drag-and-drop simplicity
                                </p>
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                                    alt="Kanban Board"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        </Card>

                        <Card className="overflow-hidden">
                            <div className="p-4">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-pink-500" />
                                    Analytics Dashboard
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Track progress with real-time insights and reports
                                </p>
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                                    alt="Analytics"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProductSreenshortsSection