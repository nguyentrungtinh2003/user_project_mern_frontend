import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { StatsCards, BoardPreview, RecentActivity, CalendarWidget, Board } from "../components/home/Index";


const Home = () => {
    const user = useSelector(selectUser)
    return (
        <div className="space-y-6 pb-8">
            {/* Welcome Header */}
            <div className="flex items-center justify-between pt-6">
                <div>
                    <h1 className="text-3xl">Welcome back, {user?.username}! 👋</h1>
                    <p className="text-muted-foreground">Here's what's happening with your projects today</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                </Button>
            </div>

            {/* Quick Stats Cards */}
            <StatsCards />

            {/* Kanban Board Preview */}
            <BoardPreview />

            {/* Bottom Section - Recent Activity & Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <RecentActivity />

                {/* Calendar Widget */}
                <CalendarWidget />
            </div>

        </div>
    );
};

export default Home;
