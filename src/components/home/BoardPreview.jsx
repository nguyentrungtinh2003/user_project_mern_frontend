import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowUpRight } from "lucide-react"
import Board from "./Board"

const BoardPreview = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Task Overview</CardTitle>
                    <CardDescription>Kanban board preview of your tasks</CardDescription>
                </div>
                <Link to="/tasks">
                    <Button variant="outline" size="sm">
                        View Full Board
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <Board />
            </CardContent>
        </Card>
    )
}

export default BoardPreview