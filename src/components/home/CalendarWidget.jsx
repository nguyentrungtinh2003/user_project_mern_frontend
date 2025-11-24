import { ArrowUpRight, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Calendar } from "../ui/calendar"
import { upcomingTasks } from "./Homeinfo"
import { Badge } from "../ui/badge"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { useState } from "react"

const CalendarWidget = () => {
    const [date, setDate] = useState(new Date());
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Upcoming Tasks
                </CardTitle>
                <CardDescription>Tasks with deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                    modifiers={{
                        hasEvent: upcomingTasks.map(task => task.date)
                    }}
                    modifiersStyles={{
                        hasEvent: {
                            fontWeight: 'bold',
                            textDecoration: 'underline'
                        }
                    }}
                />

                <div className="space-y-2 pt-4">
                    <h4 className="text-sm font-medium">Next Deadlines</h4>
                    <div className="space-y-2">
                        {upcomingTasks.slice(0, 3).map((task, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm p-2 rounded-lg border">
                                <div className="flex-1">
                                    <p className="font-medium leading-tight">{task.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {task.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {task.type}
                                </Badge>
                            </div>
                        ))}
                    </div>
                    <Link to="/tasks">
                        <Button variant="link" className="w-full text-xs px-0">
                            View all upcoming tasks
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default CalendarWidget