import { Link, NavLink } from "react-router";
import { Button } from "../components/ui/button";
import {
  ChartColumn,
  CheckCircle,
  Clock,
  FolderOpen,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Landing = () => {
  const checkUser = useSelector(selectUser)

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary flex size-8 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <FolderOpen className="text-primary-foreground size-6" />
            </div>
            <span className="text-xl font-semibold">ProjectHub</span>
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
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <NavLink to="auth/login">Log In</NavLink>
              </Button>
              <Button asChild>
                <NavLink to="auth/register">Get Started</NavLink>
              </Button>
            </div>
          )}
        </div>
      </header>
      {/* Hero section */}
      <section className="from-background to-accent/20 bg-gradient-to-br py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Comprehensive Management Platform
          </Badge>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold md:text-6xl">
            Streamline Your Projects and Team Management
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center text-xl">
            A powerful, intuitive platform designed to help organizations manage
            users, projects, and workflows with ease. Built for teams of all
            sizes.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="px-8 py-3 text-lg">
              <Link to="auth/register">Start Tree Trial</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="px-8 py-3 text-lg"
            >
              <Link to="auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Freature section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Everything you need to manage your organization effectively, from
              user administration to project tracking.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Users className="text-primary mb-2 size-10" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Complete user administration with role-based access control
                  and profile management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Role-based permissions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>User profile management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Admin dashboard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FolderOpen className="text-primary mb-2 size-10" />
                <CardTitle>Project Management</CardTitle>
                <CardDescription>
                  Organize and track projects with comprehensive CRUD operations
                  and status monitoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Create and edit projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Status tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Team assignment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="text-primary mb-2 size-10" />
                <>Secure Authentication</>
                <CardDescription>
                  Enterprise-grade security with secure login and registration
                  systems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Secure login system</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Form validation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Session management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ChartColumn className="text-primary mb-2 size-10" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive overview of your organization's performance and
                  activity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Real-time metrics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Project statistics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>User activity tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="text-primary mb-2 size-10" />
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>
                  Modern, mobile-first design that works seamlessly across all
                  devices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Mobile optimized</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Dark mode support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Fast performance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="text-primary mb-2 size-10" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Built-in tools to enhance team communication and
                  collaboration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Team messaging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>File sharing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Activity feeds</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="bg-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Get started in minutes with our intuitive setup process.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex size-16 items-center justify-center rounded-full border text-2xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account in seconds with our simple registration
                process.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex size-16 items-center justify-center rounded-full border text-2xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Set Up Your Workspace
              </h3>
              <p className="text-muted-foreground">
                Configure your organization settings and invite team members.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex size-16 items-center justify-center rounded-full border text-2xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Start Managing</h3>
              <p className="text-muted-foreground">
                Begin creating projects and managing your team with powerful
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Help & Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Help & Support</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We're here to help you succeed. Find answers to common questions
              or get in touch with our support team.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to the most common questions about our
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-1 font-semibold">
                    How do I create my first project?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Once logged in, navigate to the Projects section and click
                    "Create New Project" to get started.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-1 font-semibold">
                    Can I invite team members?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Yes! Admins can invite and manage team members through the
                    User Management section.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-1 font-semibold">Is my data secure?</h4>
                  <p className="text-muted-foreground text-sm">
                    Absolutely. We use enterprise-grade security measures to
                    protect your data.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guide</CardTitle>
                <CardDescription>
                  Step-by-step instructions to help you make the most of our
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Set up your profile</p>
                    <p className="text-muted-foreground text-sm">
                      Complete your user profile information
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Create your first project</p>
                    <p className="text-muted-foreground text-sm">
                      Add project details and set initial status
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Invite team members</p>
                    <p className="text-muted-foreground text-sm">
                      Add colleagues and assign appropriate roles
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Explore the dashboard</p>
                    <p className="text-muted-foreground text-sm">
                      Familiarize yourself with analytics and reports
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="bg-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Have questions or need assistance? Our team is here to help you
              succeed.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <Mail className="text-primary mx-auto mb-2 size-10" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  Get help via email with our dedicated support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">support@projecthub.com</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Response within 24 hours
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Phone className="text-primary mx-auto mb-2 size-10" />
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>
                  Speak directly with our support specialists.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Mon-Fri 9AM-6PM EST
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="text-primary mx-auto mb-2 size-10" />
                <CardTitle>Office Address</CardTitle>
                <CardDescription>
                  Visit us at our headquarters for in-person support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">123 Business Ave</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  San Francisco, CA 94105
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of teams already using ProjectHub to streamline their
            operations and boost productivity.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="px-8 py-3 text-lg"
            >
              <Link to="auth/register">Start Your Tree Trial</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent px-8 py-3 text-lg"
            >
              <Link to="auth/login">Sign In to Your Account</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb:mb-0 mb-4 flex items-center space-x-2">
              <div className="flex size-6 items-center justify-center rounded bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <FolderOpen className="text-primary-foreground size-4" />
              </div>
              <span className="font-semibold">ProjectHub</span>
            </div>
            <div className="text-muted-foreground flex space-x-6 text-sm">
              <Link className="hover:text-foreground">Privacy Policy</Link>
              <Link className="hover:text-foreground">Terms of Service</Link>
              <Link className="hover:text-foreground">Documentation</Link>
              <Link className="hover:text-foreground">API</Link>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-muted-foreground text-center text-sm">
            © 2025 ProjectHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
