import { Link } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowUpRight, CheckCircle2, Clock, FolderKanban, ListTodo, TrendingUp } from "lucide-react"
import { stats } from "./Homeinfo"


const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
                    <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl">{stats.myTasks}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Active assignments
                    </p>
                    <div className="mt-3">
                        <Link to="/tasks" className="text-xs text-primary hover:underline inline-flex items-center">
                            View all
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl">{stats.completedTasks}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-600 inline-flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12%
                        </span>
                        {' '}from last month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl">{stats.upcomingDeadlines}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Next 7 days
                    </p>
                    <div className="mt-3">
                        <Link to="/tasks" className="text-xs text-primary hover:underline inline-flex items-center">
                            View calendar
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl">{stats.activeProjects}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        In progress
                    </p>
                    <div className="mt-3">
                        <Link to="/projects" className="text-xs text-primary hover:underline inline-flex items-center">
                            View projects
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCards