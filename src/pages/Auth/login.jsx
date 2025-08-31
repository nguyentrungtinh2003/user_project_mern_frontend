import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Alert, AlertDescription } from "../ui/alert"
import { Link, useNavigate } from 'react-router';


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [fromData, setFromData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFromData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        try {
            const success = await login(fromData.email, fromData.password)
            if (!success) {
                setError('Invalid email or password')
            } else {
                navigate('/')
            }
        } catch (error) {
            setError('An error occurred during login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-md">
                <CardHeader className="gap-1">
                    <CardTitle className="text-2xl text-center">Welcom back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="size-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id='email'
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={fromData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id='password'
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={fromData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant='ghost'
                                    size='sm'
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (<EyeOff className="size-4" />) : (<Eye className="size-4" />)}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>

                    <div className="text-center flex flex-col gap-2">
                        <Button variant='link' className="text-sm">Forgot your password?</Button>
                        <div className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Button variant='link' className="p-0 h-auto" asChild>
                                <Link to="/auth/register">Sign up</Link>
                            </Button>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <Button variant='link' className="p-0 h-auto" asChild >
                                <Link to="/">← Back to home</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login