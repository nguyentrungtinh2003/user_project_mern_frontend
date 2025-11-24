// Mock data for dashboard
const stats = {
  myTasks: 12,
  completedTasks: 28,
  upcomingDeadlines: 5,
  activeProjects: 3,
};

// Kanban board data
const kanbanColumns = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        project: "Website Redesign",
        priority: "high",
        assignee: "JD",
      },
      {
        id: "2",
        title: "Update API documentation",
        project: "API Project",
        priority: "medium",
        assignee: "SM",
      },
      {
        id: "3",
        title: "Review pull requests",
        project: "Mobile App",
        priority: "low",
        assignee: "MJ",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "4",
        title: "Implement user authentication",
        project: "Dashboard",
        priority: "high",
        assignee: "JD",
      },
      {
        id: "5",
        title: "Fix responsive layout",
        project: "Website Redesign",
        priority: "medium",
        assignee: "SM",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "6",
        title: "Code review for payment flow",
        project: "E-commerce",
        priority: "high",
        assignee: "MJ",
      },
      {
        id: "7",
        title: "Test new features",
        project: "Mobile App",
        priority: "medium",
        assignee: "JD",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "8",
        title: "Setup project repository",
        project: "New Project",
        priority: "low",
        assignee: "SM",
      },
      {
        id: "9",
        title: "Initial wireframes",
        project: "Website Redesign",
        priority: "medium",
        assignee: "MJ",
      },
    ],
  },
];

// Recent activity data
const recentActivities = [
  {
    id: "1",
    user: "Sarah Miller",
    action: "completed task",
    target: "Design system components",
    project: "UI Library",
    time: "5 min ago",
    avatar: "SM",
  },
  {
    id: "2",
    user: "John Doe",
    action: "commented on",
    target: "API Integration",
    project: "Backend Service",
    time: "12 min ago",
    avatar: "JD",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "created",
    target: "New feature request",
    project: "Mobile App",
    time: "1 hour ago",
    avatar: "MJ",
  },
  {
    id: "4",
    user: "Emily Chen",
    action: "updated",
    target: "Sprint planning",
    project: "Website Redesign",
    time: "2 hours ago",
    avatar: "EC",
  },
  {
    id: "5",
    user: "David Lee",
    action: "assigned you to",
    target: "Code review task",
    project: "API Project",
    time: "3 hours ago",
    avatar: "DL",
  },
];

// Upcoming tasks for calendar
const upcomingTasks = [
  { date: new Date(2025, 10, 15), title: "Project deadline", type: "deadline" },
  { date: new Date(2025, 10, 16), title: "Team meeting", type: "meeting" },
  { date: new Date(2025, 10, 18), title: "Sprint review", type: "review" },
  {
    date: new Date(2025, 10, 20),
    title: "Client presentation",
    type: "presentation",
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "text-red-500 border-red-200 bg-red-50";
    case "medium":
      return "text-yellow-600 border-yellow-200 bg-yellow-50";
    case "low":
      return "text-blue-500 border-blue-200 bg-blue-50";
    default:
      return "text-gray-500 border-gray-200 bg-gray-50";
  }
};

const getColumnColor = (columnId) => {
  switch (columnId) {
    case "todo":
      return "border-l-slate-500";
    case "in-progress":
      return "border-l-blue-500";
    case "review":
      return "border-l-orange-500";
    case "done":
      return "border-l-green-500";
    default:
      return "border-l-gray-500";
  }
};

export {
  stats,
  kanbanColumns,
  recentActivities,
  upcomingTasks,
  getPriorityColor,
  getColumnColor,
};
