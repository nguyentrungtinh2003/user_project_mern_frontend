import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "../../components/ui/sidebar";
import { ActivityIcon, Bell, FolderOpen, Home, ListTodo, LogOut, Search, Settings, Target, User, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAdmin, selectUser } from "../../features/auth/authSlice";
import { Input } from "../../components/ui/input";


const Layout = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const isAdmin = useSelector(selectIsAdmin)


    const handleLogout = async () => {
        try {
            if (user) {
                dispatch(logout())
            }
        } finally {
            navigate("/", { replace: true })
        }
    }

    const navigate = useNavigate();
    const localtion = useLocation();
    const navigationItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/home" },
        { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects' },
        { id: 'tasks', label: 'Tasks', icon: ListTodo, path: '/tasks' },
        { id: 'activity', label: 'Activity Log', icon: ActivityIcon, path: '/activity' },
        ...(isAdmin
            ? [
                { id: "users", label: "Manage Users", icon: Users, path: "/users" },
                {
                    id: "project",
                    label: "Manage Projects",
                    icon: FolderOpen,
                    path: "/projects",
                },
            ]
            : []),
    ];

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader onClick={() => navigate("/home")}>
                    <div className="flex items-center gap-2 px-4 py-2 transition-[width,height,padding] group-data-[collapsible=icon]:p-0!">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                            <div className="flex size-8 items-center justify-center">
                                <Target className="text-primary-foreground size-5" />
                            </div>
                        </div>
                        <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
                            ProjectHub
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigationItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = localtion.pathname === item.path;
                                    return (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.label}
                                            >
                                                <NavLink to={item.path}>
                                                    <Icon className="size-4" />
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="size-8 rounded-lg">
                                            <AvatarImage src={user.image} />
                                            <AvatarFallback className="rounded-lg">
                                                {user.username.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user.username}
                                            </span>
                                            <span className="truncate text-xs">{user.email}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                                        <User className="mr-2 size-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 size-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 size-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-4 w-px bg-border" />

                    {/* Search Bar */}
                    <div className="flex flex-1 items-center gap-4">
                        <form className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search projects, tasks..."
                                    className="pl-9 h-9"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    variant="ghost"
                                    size="icon"
                                    className="relative"
                                >
                                    <Bell className="size-5" />
                                    {false && (
                                        <span className="absolute top-1 right-1 size-2 rounded-full bg-destructive" />
                                    )}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                                forceMount
                            >
                                <DropdownMenuItem className={`text-2xl font-medium`}>
                                    Notifications
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem >
                                    No unread notifications
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2">
                        <SidebarFooter>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="size-9 rounded-lg">
                                            <AvatarImage src={user.image} />
                                            <AvatarFallback className="rounded-lg">
                                                {user.username.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                    forceMount
                                >
                                    <DropdownMenuLabel onClick={() => navigate("/profile")} className="font-normal">
                                        <div className="flex space-y-1 space-x-2">
                                            <Avatar className="size-8 rounded-lg">
                                                <AvatarImage src={user.image} />
                                                <AvatarFallback className="rounded-lg">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user.username}
                                                </span>
                                                <span className="truncate text-xs">{user.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                                        <User className="mr-2 size-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                                        <Settings className="mr-2 size-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 size-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarFooter>
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>

        </SidebarProvider>
    );
};

export default Layout;
