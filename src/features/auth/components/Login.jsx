import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { loginThunk } from "../authThunk";
import { toast } from "sonner";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error: rdxError } = useSelector(s => s.auth)
    const [fromData, setFromData] = useState({
        username: "",
        password: ""
    })

    const [localError, setLocalError] = useState("");

    const toErrorText = (e) => {
        if (!e) return "";
        if (typeof e === "string") return e;
        if (e?.message && typeof e.message === 'string') return e.message;
        try { return JSON.stringify(e) } catch { return String(e) }
    }


    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setFromData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (localError) setLocalError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");

        if (!fromData.username || !fromData.password) {
            setLocalError("Please fill in all fields");
            return;
        }

        try {
            await dispatch(loginThunk(fromData)).unwrap();
            navigate("/home");
        } catch (msg) {
            // setLocalError(typeof msg === "string" ? msg : "Invalid username or password")
            setLocalError("Invalid username or password")
        }
    };
    // const displayError = toErrorText(localError || rdxError)
    const displayError = toErrorText(localError)

    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="gap-1">
                    <CardTitle className="text-center text-2xl">Welcom back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {displayError && (
                        <Alert variant="destructive">
                            <AlertCircle className="size-4" />
                            <AlertDescription>{displayError}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">User name</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="on"
                                placeholder="Enter your username"
                                value={fromData.username.trim()}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    autoComplete="on"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={fromData.password.trim()}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <div className="flex flex-col gap-2 text-center">
                        <Button variant="link" className="text-sm">
                            Forgot your password?
                        </Button>
                        <div className="text-muted-foreground text-sm">
                            Don't have an account?{" "}
                            <Button variant="link" className="h-auto p-0" asChild>
                                <Link to="/auth/register">Sign up</Link>
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-sm">
                            <Button variant="link" className="h-auto p-0" asChild >
                                <Link to="/">← Back to home</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
