import { Target } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"

const Navigation = () => {
    const checkUser = useSelector(selectUser)

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                            <Target className="size-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-semibold">ProjectHub</span>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
                        <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
                        <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a>
                        <a href="#" className="text-sm hover:text-primary transition-colors">Docs</a>
                    </div>

                    {checkUser && checkUser?.username ? (
                        <div className="flex space-x-3 items-center">
                            <Avatar>
                                <AvatarImage src={checkUser.image} />
                                <AvatarFallback>
                                    {checkUser?.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-muted-foreground">{checkUser.username}</div>
                            </div>
                        </div >
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" asChild>
                                <Link to="auth/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="auth/register">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navigation