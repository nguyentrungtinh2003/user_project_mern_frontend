import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import { ChartColumn, CheckCircle, CircleCheck, Clock, FolderOpen, Mail, MapPin, Phone, Shield, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex justify-between items-center mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="size-8 bg-primary flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <FolderOpen className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">ProjectHub</span>
          </div>
          <div className="flex space-x-3">
            <Button variant='outline' asChild>
              <NavLink to="auth/login">Log In</NavLink>
            </Button>
            <Button asChild>
              <NavLink to="auth/register">Get Started</NavLink>
            </Button>
          </div>
        </div>
      </header>
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-br from-background to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant='secondary' className="mb-4">
            Comprehensive Management Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Streamline Your Projects and Team Management
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            A powerful, intuitive platform designed to help organizations manage users, projects, and workflows with ease. Built for teams of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size='lg' asChild className='text-lg px-8 py-3'>
              <Link to="auth/register">Start Tree Trial</Link>
            </Button>
            <Button variant='outline' size='lg' asChild className='text-lg px-8 py-3'>
              <Link to="auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Freature section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Teams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to manage your organization effectively, from user administration to project tracking.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card >
              <CardHeader>
                <Users className="size-10 text-primary mb-2" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>Complete user administration with role-based access control and profile management.</CardDescription>
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
            <Card >
              <CardHeader>
                <FolderOpen className="size-10 text-primary mb-2" />
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Organize and track projects with comprehensive CRUD operations and status monitoring.</CardDescription>
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
            <Card >
              <CardHeader>
                <Shield className="size-10 text-primary mb-2" />
                <>Secure Authentication</>
                <CardDescription>Enterprise-grade security with secure login and registration systems.</CardDescription>
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
            <Card >
              <CardHeader>
                <ChartColumn className="size-10 text-primary mb-2" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Comprehensive overview of your organization's performance and activity.</CardDescription>
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
            <Card >
              <CardHeader>
                <Clock className="size-10 text-primary mb-2" />
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>Modern, mobile-first design that works seamlessly across all devices.</CardDescription>
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
            <Card >
              <CardHeader>
                <Users className="size-10 text-primary mb-2" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Built-in tools to enhance team communication and collaboration.</CardDescription>
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
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get started in minutes with our intuitive setup process.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center border rounded-full bg-primary text-primary-foreground font-bold size-16 text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-xl mb-2">Sign Up</h3>
              <p className="text-muted-foreground">Create your account in seconds with our simple registration process.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center border rounded-full bg-primary text-primary-foreground font-bold size-16 text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-xl mb-2">Set Up Your Workspace</h3>
              <p className="text-muted-foreground">Configure your organization settings and invite team members.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center border rounded-full bg-primary text-primary-foreground font-bold size-16 text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-xl mb-2">Start Managing</h3>
              <p className="text-muted-foreground">Begin creating projects and managing your team with powerful tools.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Help & Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Help & Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We're here to help you succeed. Find answers to common questions or get in touch with our support team.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find quick answers to the most common questions about our platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">How do I create my first project?</h4>
                  <p className="text-sm text-muted-foreground">Once logged in, navigate to the Projects section and click "Create New Project" to get started.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Can I invite team members?</h4>
                  <p className="text-sm text-muted-foreground">Yes! Admins can invite and manage team members through the User Management section.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Is my data secure?</h4>
                  <p className="text-sm text-muted-foreground">Absolutely. We use enterprise-grade security measures to protect your data.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guide</CardTitle>
                <CardDescription>Step-by-step instructions to help you make the most of our platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Set up your profile</p>
                    <p className="text-sm text-muted-foreground">Complete your user profile information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Create your first project</p>
                    <p className="text-sm text-muted-foreground">Add project details and set initial status</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Invite team members</p>
                    <p className="text-sm text-muted-foreground">Add colleagues and assign appropriate roles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Explore the dashboard</p>
                    <p className="text-sm text-muted-foreground">Familiarize yourself with analytics and reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Have questions or need assistance? Our team is here to help you succeed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Mail className="size-10 text-primary mx-auto mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Get help via email with our dedicated support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">support@projecthub.com</p>
                <p className="text-sm text-muted-foreground mt-1">Response within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Phone className="size-10 text-primary mx-auto mb-2" />
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Speak directly with our support specialists.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground mt-1">Mon-Fri 9AM-6PM EST</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="size-10 text-primary mx-auto mb-2" />
                <CardTitle>Office Address</CardTitle>
                <CardDescription>Visit us at our headquarters for in-person support.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">123 Business Ave</p>
                <p className="text-sm text-muted-foreground mt-1">San Francisco, CA 94105</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Join thousands of teams already using ProjectHub to streamline their operations and boost productivity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant='secondary' size='lg' asChild className='text-lg px-8 py-3'>
              <Link to="auth/register">Start Your Tree Trial</Link>
            </Button>
            <Button variant='outline' size='lg' asChild className='text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'>
              <Link to="auth/login">Sign In to Your Account</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 mb:mb-0">
              <div className="size-6 rounded flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <FolderOpen className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ProjectHub</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground ">
              <Link className="hover:text-foreground">Privacy Policy</Link>
              <Link className="hover:text-foreground">Terms of Service</Link>
              <Link className="hover:text-foreground">Documentation</Link>
              <Link className="hover:text-foreground">API</Link>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            © 2025 ProjectHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
