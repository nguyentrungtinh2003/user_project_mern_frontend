import { BarChart3, Bell, FolderKanban, ListTodo, MessageSquare, Shield, Users, Zap } from "lucide-react";


const features = [
    {
        icon: ListTodo,
        title: 'Task Management',
        description: 'Create, assign, and track tasks with ease. Keep your team organized and productive.',
        color: 'text-blue-500'
    },
    {
        icon: FolderKanban,
        title: 'Project Boards',
        description: 'Visualize your workflow with Kanban boards. Drag and drop tasks to update status.',
        color: 'text-purple-500'
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Work together seamlessly. Comment, mention, and share files with your team.',
        color: 'text-green-500'
    },
    {
        icon: Bell,
        title: 'Smart Notifications',
        description: 'Stay updated with real-time notifications. Never miss important updates.',
        color: 'text-orange-500'
    },
    {
        icon: BarChart3,
        title: 'Analytics & Insights',
        description: 'Track progress and performance with comprehensive analytics and reports.',
        color: 'text-pink-500'
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-level security with role-based access control and data encryption.',
        color: 'text-red-500'
    },
    {
        icon: Zap,
        title: 'Automation',
        description: 'Automate repetitive tasks and workflows to save time and reduce errors.',
        color: 'text-yellow-500'
    },
    {
        icon: MessageSquare,
        title: 'Real-time Chat',
        description: 'Communicate instantly with built-in messaging and video calls.',
        color: 'text-indigo-500'
    }
];

const pricingPlans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for individuals and small teams getting started',
        features: [
            'Up to 5 team members',
            '10 projects',
            'Basic task management',
            'Mobile app access',
            'Email support',
            '1GB storage'
        ],
        cta: 'Get Started Free',
        popular: false
    },
    {
        name: 'Pro',
        price: '$12',
        period: 'per user/month',
        description: 'Best for growing teams and businesses',
        features: [
            'Unlimited team members',
            'Unlimited projects',
            'Advanced task management',
            'Priority support',
            'Custom workflows',
            'Advanced analytics',
            '100GB storage',
            'Integrations'
        ],
        cta: 'Start Free Trial',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact sales',
        description: 'For large organizations with advanced needs',
        features: [
            'Everything in Pro',
            'Dedicated account manager',
            'Custom integrations',
            'Advanced security',
            'SLA guarantee',
            'On-premise option',
            'Unlimited storage',
            'White-label options'
        ],
        cta: 'Contact Sales',
        popular: false
    }
];

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'TechCorp',
        avatar: 'SJ',
        content: 'This tool has transformed how our team collaborates. We\'ve increased productivity by 40% since switching.',
        rating: 5
    },
    {
        name: 'Michael Chen',
        role: 'CEO',
        company: 'StartupHub',
        avatar: 'MC',
        content: 'The best project management solution we\'ve used. Intuitive, powerful, and the team actually loves using it.',
        rating: 5
    },
    {
        name: 'Emily Rodriguez',
        role: 'Engineering Lead',
        company: 'DevWorks',
        avatar: 'ER',
        content: 'Finally, a project management tool that doesn\'t get in the way. Clean interface and powerful features.',
        rating: 5
    }
];

const footerLinks = {
    product: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Security', href: '#' },
        { label: 'Roadmap', href: '#' }
    ],
    company: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' }
    ],
    resources: [
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'API', href: '#' }
    ],
    legal: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Licenses', href: '#' }
    ]
};

export {
    features, pricingPlans, testimonials, footerLinks
}