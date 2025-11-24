import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Eye, EyeOff, AlertCircle, CheckCircle, Target } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../authThunk";
import { Separator } from "../../../components/ui/separator";
import { Checkbox } from "../../../components/ui/checkbox";

const Register = () => {
    // const{loading} = useSelector(selectAuthLoading)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) setError("");
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const { email, password, username } = formData
            const success = await dispatch(registerThunk({ email, password, username })).unwrap();
            if (!success) {
                setError("Registration failed. Please try again.");
            } else {
                navigate("/home");
            }
        } catch (err) {
            setError("An error occurred during registration" || err);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        // <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
        //     <Card className="w-full max-w-md">
        //         <CardHeader className="space-y-1">
        //             <CardTitle className="text-center text-2xl">
        //                 Create an account
        //             </CardTitle>
        //             <CardDescription className="text-center">
        //                 Enter your information to get started
        //             </CardDescription>
        //         </CardHeader>
        //         <CardContent className="space-y-4">
        //             {error && (
        //                 <Alert variant="destructive">
        //                     <AlertCircle className="h-4 w-4" />
        //                     <AlertDescription>{error}</AlertDescription>
        //                 </Alert>
        //             )}

        //             <form onSubmit={handleSubmit} className="space-y-4">
        //                 <div className="space-y-2">
        //                     <Label htmlFor="name">User name</Label>
        //                     <Input
        //                         id="username"
        //                         name="username"
        //                         type="text"
        //                         placeholder="Enter your full name"
        //                         value={formData.username}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>

        //                 <div className="space-y-2">
        //                     <Label htmlFor="email">Email</Label>
        //                     <Input
        //                         id="email"
        //                         name="email"
        //                         type="email"
        //                         placeholder="Enter your email"
        //                         value={formData.email}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>

        //                 <div className="space-y-2">
        //                     <Label htmlFor="password">Password</Label>
        //                     <div className="relative">
        //                         <Input
        //                             id="password"
        //                             name="password"
        //                             type={showPassword ? "text" : "password"}
        //                             placeholder="Create a password"
        //                             value={formData.password}
        //                             onChange={handleChange}
        //                             autoComplete="off"
        //                             required
        //                         />
        //                         <Button
        //                             type="button"
        //                             variant="ghost"
        //                             size="sm"
        //                             className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        //                             onClick={() => setShowPassword(!showPassword)}
        //                         >
        //                             {showPassword ? (
        //                                 <EyeOff className="h-4 w-4" />
        //                             ) : (
        //                                 <Eye className="h-4 w-4" />
        //                             )}
        //                         </Button>
        //                     </div>

        //                     {formData.password && (
        //                         <div className="space-y-1">
        //                             <div className="flex gap-1">
        //                                 {[...Array(4)].map((_, i) => (
        //                                     <div
        //                                         key={i}
        //                                         className={`h-1 w-full rounded ${i < passwordStrength
        //                                             ? passwordStrength <= 1
        //                                                 ? "bg-red-500"
        //                                                 : passwordStrength <= 2
        //                                                     ? "bg-yellow-500"
        //                                                     : "bg-green-500"
        //                                             : "bg-muted"
        //                                             }`}
        //                                     />
        //                                 ))}
        //                             </div>
        //                             <p className="text-muted-foreground text-xs">
        //                                 Password strength:{" "}
        //                                 {passwordStrength <= 1
        //                                     ? "Weak"
        //                                     : passwordStrength <= 2
        //                                         ? "Fair"
        //                                         : passwordStrength <= 3
        //                                             ? "Good"
        //                                             : "Strong"}
        //                             </p>
        //                         </div>
        //                     )}
        //                 </div>

        //                 <div className="space-y-2">
        //                     <Label htmlFor="confirmPassword">Confirm Password</Label>
        //                     <div className="relative">
        //                         <Input
        //                             id="confirmPassword"
        //                             name="confirmPassword"
        //                             type={showConfirmPassword ? "text" : "password"}
        //                             placeholder="Confirm your password"
        //                             value={formData.confirmPassword}
        //                             onChange={handleChange}
        //                             autoComplete="off"
        //                             required
        //                         />
        //                         <Button
        //                             type="button"
        //                             variant="ghost"
        //                             size="sm"
        //                             className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        //                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        //                         >
        //                             {showConfirmPassword ? (
        //                                 <EyeOff className="h-4 w-4" />
        //                             ) : (
        //                                 <Eye className="h-4 w-4" />
        //                             )}
        //                         </Button>
        //                     </div>
        //                     {formData.confirmPassword &&
        //                         formData.password === formData.confirmPassword && (
        //                             <div className="flex items-center gap-1 text-green-600">
        //                                 <CheckCircle className="h-3 w-3" />
        //                                 <span className="text-xs">Passwords match</span>
        //                             </div>
        //                         )}
        //                 </div>

        //                 <Button type="submit" className="w-full" disabled={loading}>
        //                     {loading ? "Creating account..." : "Create account"}
        //                 </Button>
        //             </form>

        //             <div className="space-y-2 text-center">
        //                 <div className="text-muted-foreground text-sm">
        //                     Already have an account?{" "}
        //                     <Button variant="link" className="h-auto p-0" asChild>
        //                         <Link to="/auth/login">Sign in</Link>
        //                     </Button>
        //                 </div>

        //                 <div className="text-muted-foreground text-sm">
        //                     <Button variant="link" className="h-auto p-0" asChild>
        //                         <Link to="/"> ← Back to home</Link>
        //                     </Button>
        //                 </div>
        //             </div>
        //         </CardContent>
        //     </Card>
        // </div>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo and Header */}
                <div className="flex flex-col items-center space-y-3">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-semibold">ProjectHub</span>
                    </Link>
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl">Create your account</h1>
                        <p className="text-sm text-muted-foreground">
                            Start managing projects in minutes
                        </p>
                    </div>
                </div>

                {/* Register Card */}
                <div className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Social Signup Options */}
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialSignup('google')}
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign up with Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialSignup('github')}
                        >
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Sign up with GitHub
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm">
                                Full name
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password (min. 6 characters)"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="h-11"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            {formData.password && (
                                <div className="space-y-1.5">
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 w-full rounded transition-colors ${i < passwordStrength
                                                    ? passwordStrength <= 1
                                                        ? 'bg-red-500'
                                                        : passwordStrength <= 2
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-500'
                                                    : 'bg-muted'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {passwordStrength <= 1 ? 'Weak password' :
                                            passwordStrength <= 2 ? 'Fair password' :
                                                passwordStrength <= 3 ? 'Good password' : 'Strong password'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm">
                                Confirm password
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="h-11"
                            />
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <div className="flex items-center gap-1.5 text-green-600">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    <span className="text-xs">Passwords match</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <Checkbox
                                id="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) =>
                                    setFormData(prev => ({ ...prev, agreeToTerms: checked }))
                                }
                                className="mt-0.5"
                            />
                            <Label
                                htmlFor="agreeToTerms"
                                className="text-sm cursor-pointer select-none leading-relaxed"
                            >
                                I agree to the{' '}
                                <a href="#" className="underline underline-offset-4 hover:text-primary">
                                    Terms of Service
                                </a>
                                {' '}and{' '}
                                <a href="#" className="underline underline-offset-4 hover:text-primary">
                                    Privacy Policy
                                </a>
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link
                                to="/auth/login"
                                className="font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center">
                        <Button
                            variant="ghost"
                            className="text-sm text-muted-foreground"
                            asChild
                        >
                            <Link to="/">← Back to home</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
