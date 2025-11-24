import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowUpRight } from "lucide-react"
import { recentActivities } from "./Homeinfo"
import { Avatar, AvatarFallback } from "../ui/avatar"

const RecentActivity = () => {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your team</CardDescription>
                    </div>
                    <Link to="/activity">
                        <Button variant="ghost" size="sm">
                            View All
                            <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <Avatar className="h-9 w-9 mt-0.5">
                                <AvatarFallback>{activity.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm leading-tight">
                                    <span className="font-medium">{activity.user}</span>
                                    {' '}
                                    <span className="text-muted-foreground">{activity.action}</span>
                                    {' '}
                                    <span className="font-medium">{activity.target}</span>
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{activity.project}</span>
                                    <span>•</span>
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentActivity