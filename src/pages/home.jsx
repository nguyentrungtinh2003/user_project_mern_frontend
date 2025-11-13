import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/ui/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { BotIcon, Plus, Users } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../components/ui/badge";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectUser } from "../features/auth/authSlice";

const Home = () => {
    const user = useSelector(selectUser)
    const isAdmin = useSelector(selectIsAdmin)

    const status = {};

    const recentProjects = [{}];

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-lg">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2NDQzNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Modern workspace"
                    className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center text-white">
                        <h1 className="mb-2 text-3xl">Welcome back, {user?.username}!</h1>
                        <p className="text-lg opacity-90">
                            {isAdmin
                                ? "Manage your team and projects efficiently"
                                : "Stay productive and collaborate effectively"}
                        </p>
                    </div>
                </div>
            </div>
            {/* Stats Cards */}
            {isAdmin && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-muted-foreground text-xs">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-muted-foreground text-xs">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-muted-foreground text-xs">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-muted-foreground text-xs">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/*Recent Project*/}
                <Card>
                    <CardHeader className="grid grid-cols-1 items-center justify-between transition-[width,height,padding] min-[300px]:flex">
                        <div>
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>Your latest project updates</CardDescription>
                        </div>
                        <Button size="sm" asChild>
                            <Link to={isAdmin ? "" : "#"}>
                                <Plus className="mr-2 size-4" />
                                New Project
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex-1 space-y-1">
                                <div className="grid grid-cols-1 items-center gap-2 min-[230px]:flex">
                                    <h4 className="font-medium">E-commerce Platform</h4>
                                    <Badge variant={""} className="flex items-center gap-1">
                                        <BotIcon />
                                        Status
                                    </Badge>
                                </div>
                                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                    <span>5 team members</span>
                                    <span>Due: 15/2/2024</span>
                                </div>
                                <div className="bg-muted h-2 w-full rounded-full">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: 10 }}
                                    />
                                </div>
                                <p className="text-muted-foreground text-xs">0% complete</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex-1 space-y-1">
                                <div className="grid grid-cols-1 items-center gap-2 min-[230px]:flex">
                                    <h4 className="font-medium">E-commerce Platform</h4>
                                    <Badge variant={""} className="flex items-center gap-1">
                                        <BotIcon />
                                        Status
                                    </Badge>
                                </div>
                                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                    <span>5 team members</span>
                                    <span>Due: 15/2/2024</span>
                                </div>
                                <div className="bg-muted h-2 w-full rounded-full">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: 10 }}
                                    />
                                </div>
                                <p className="text-muted-foreground text-xs">0% complete</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/*Recent Activity*/}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest updates across your projects
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                            <div className="bg-primary mt-2 size-2 shrink-0 rounded-full" />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm">
                                    <span className="font-medium">Project created</span> in{" "}
                                    <span className="font-medium">E-commerce Platform</span>
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    by John Doe • 2 hours ago
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                            <div className="bg-primary mt-2 size-2 shrink-0 rounded-full" />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm">
                                    <span className="font-medium">Project created</span> in{" "}
                                    <span className="font-medium">E-commerce Platform</span>
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    by John Doe • 2 hours ago
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>


        </div>
    );

};

export default Home;
