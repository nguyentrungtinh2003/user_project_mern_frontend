import { Calendar, Edit, MoreVertical, Plus, Search, Trash2, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as CalendarButton } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

const TasksPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [assigneeFilter, setAssigneeFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        project: ''
    });

    // Mock tasks data
    const [tasks, setTasks] = useState([
        {
            id: '1',
            title: 'Design new landing page',
            description: 'Create mockups and wireframes for the new landing page',
            project: 'Website Redesign',
            status: 'todo',
            priority: 'high',
            assignee: { id: '1', name: 'John Doe', avatar: 'JD' },
            dueDate: '2025-11-20',
            createdAt: '2025-11-10'
        },
        {
            id: '2',
            title: 'Implement user authentication',
            description: 'Set up JWT authentication with secure token handling',
            project: 'Dashboard',
            status: 'in-progress',
            priority: 'high',
            assignee: { id: '2', name: 'Jane Smith', avatar: 'JS' },
            dueDate: '2025-11-18',
            createdAt: '2025-11-08'
        },
        {
            id: '3',
            title: 'Update API documentation',
            description: 'Add missing endpoints and update existing documentation',
            project: 'API Project',
            status: 'todo',
            priority: 'medium',
            assignee: { id: '3', name: 'Mike Johnson', avatar: 'MJ' },
            dueDate: '2025-11-22',
            createdAt: '2025-11-11'
        },
        {
            id: '4',
            title: 'Fix responsive layout issues',
            description: 'Address mobile view bugs in navigation and footer',
            project: 'Website Redesign',
            status: 'in-progress',
            priority: 'medium',
            assignee: { id: '4', name: 'Sarah Williams', avatar: 'SW' },
            dueDate: '2025-11-19',
            createdAt: '2025-11-09'
        },
        {
            id: '5',
            title: 'Code review for payment flow',
            description: 'Review and approve payment processing implementation',
            project: 'E-commerce',
            status: 'review',
            priority: 'high',
            assignee: { id: '1', name: 'John Doe', avatar: 'JD' },
            dueDate: '2025-11-17',
            createdAt: '2025-11-12'
        },
        {
            id: '6',
            title: 'Test new features',
            description: 'Comprehensive testing of recently added features',
            project: 'Mobile App',
            status: 'review',
            priority: 'medium',
            assignee: { id: '5', name: 'Tom Brown', avatar: 'TB' },
            dueDate: '2025-11-21',
            createdAt: '2025-11-13'
        },
        {
            id: '7',
            title: 'Setup project repository',
            description: 'Initialize git repo and configure CI/CD',
            project: 'New Project',
            status: 'done',
            priority: 'low',
            assignee: { id: '2', name: 'Jane Smith', avatar: 'JS' },
            dueDate: '2025-11-10',
            createdAt: '2025-11-05'
        },
        {
            id: '8',
            title: 'Create initial wireframes',
            description: 'Design wireframes for main application screens',
            project: 'Website Redesign',
            status: 'done',
            priority: 'medium',
            assignee: { id: '3', name: 'Mike Johnson', avatar: 'MJ' },
            dueDate: '2025-11-12',
            createdAt: '2025-11-06'
        },
        {
            id: '9',
            title: 'Review pull requests',
            description: 'Review and merge pending PRs from team members',
            project: 'Mobile App',
            status: 'todo',
            priority: 'low',
            assignee: { id: '4', name: 'Sarah Williams', avatar: 'SW' },
            dueDate: '2025-11-23',
            createdAt: '2025-11-14'
        },
        {
            id: '10',
            title: 'Optimize database queries',
            description: 'Improve performance of slow running queries',
            project: 'API Project',
            status: 'in-progress',
            priority: 'high',
            assignee: { id: '2', name: 'Jane Smith', avatar: 'JS' },
            dueDate: '2025-11-19',
            createdAt: '2025-11-10'
        },
    ]);

    // Get unique assignees
    const assignees = [...new Map(tasks.map(t => [t.assignee.id, t.assignee])).values()];

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        const matchesAssignee = assigneeFilter === 'all' || task.assignee.id === assigneeFilter;

        let matchesDateRange = true;
        if (dateRange?.from && dateRange?.to) {
            const taskDueDate = new Date(task.dueDate);
            matchesDateRange = taskDueDate >= dateRange.from && taskDueDate <= dateRange.to;
        }

        return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesDateRange;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'todo':
                return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'review':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'done':
                return 'bg-green-100 text-green-700 border-green-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'medium':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'low':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedTasks(filteredTasks.map(task => task.id));
        } else {
            setSelectedTasks([]);
        }
    };

    const handleSelectTask = (taskId, checked) => {
        if (checked) {
            setSelectedTasks([...selectedTasks, taskId]);
        } else {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId));
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
        toast.success('Task status updated');
    };

    const handleCreateTask = () => {
        if (!newTask.title) {
            toast.error('Please enter a task title');
            return;
        }

        const task = {
            id: Date.now().toString(),
            ...newTask,
            assignee: assignees.find(a => a.id === newTask.assignee) || assignees[0],
            createdAt: new Date().toISOString().split('T')[0],
        };

        setTasks([task, ...tasks]);
        setIsCreateDialogOpen(false);
        setNewTask({ title: '', description: '', status: 'todo', priority: 'medium', assignee: '', dueDate: '', project: '' });
        toast.success('Task created successfully');
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            assignee: task.assignee.id,
            dueDate: task.dueDate,
            project: task.project
        });
        setIsCreateDialogOpen(true);
    };

    const handleUpdateTask = () => {
        if (!newTask.title) {
            toast.error('Please enter a task title');
            return;
        }

        setTasks(tasks.map(task =>
            task.id === editingTask.id
                ? { ...task, ...newTask, assignee: assignees.find(a => a.id === newTask.assignee) || task.assignee }
                : task
        ));
        setIsCreateDialogOpen(false);
        setEditingTask(null);
        setNewTask({ title: '', description: '', status: 'todo', priority: 'medium', assignee: '', dueDate: '', project: '' });
        toast.success('Task updated successfully');
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully');
    };

    const handleBulkDelete = () => {
        setTasks(tasks.filter(task => !selectedTasks.includes(task.id)));
        setSelectedTasks([]);
        toast.success(`${selectedTasks.length} tasks deleted`);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setPriorityFilter('all');
        setAssigneeFilter('all');
        setDateRange({ from: null, to: null });
    };

    const activeFiltersCount = [
        statusFilter !== 'all',
        priorityFilter !== 'all',
        assigneeFilter !== 'all',
        dateRange?.from && dateRange?.to,
    ].filter(Boolean).length;

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between pt-6">
                <div>
                    <h1 className="text-3xl">Tasks</h1>
                    <p className="text-muted-foreground">Manage and track all your tasks</p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
                    setIsCreateDialogOpen(open);
                    if (!open) {
                        setEditingTask(null);
                        setNewTask({ title: '', description: '', status: 'todo', priority: 'medium', assignee: '', dueDate: '', project: '' });
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                            <DialogDescription>
                                {editingTask ? 'Update task details and information' : 'Add a new task to track your work'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter task title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter task description"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="project">Project</Label>
                                <Input
                                    id="project"
                                    placeholder="Enter project name"
                                    value={newTask.project}
                                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todo">To Do</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="review">In Review</SelectItem>
                                            <SelectItem value="done">Done</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="assignee">Assignee</Label>
                                    <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select assignee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {assignees.map((assignee) => (
                                                <SelectItem key={assignee.id} value={assignee.id}>{assignee.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dueDate">Due Date</Label>
                                    <Input
                                        id="dueDate"
                                        type="date"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => {
                                setIsCreateDialogOpen(false);
                                setEditingTask(null);
                                setNewTask({ title: '', description: '', status: 'todo', priority: 'medium', assignee: '', dueDate: '', project: '' });
                            }}>
                                Cancel
                            </Button>
                            <Button onClick={editingTask ? handleUpdateTask : handleCreateTask}>
                                {editingTask ? 'Update Task' : 'Create Task'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* Search */}
                            <div className="lg:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search tasks..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="review">In Review</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Priority Filter */}
                            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priority</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Assignee Filter */}
                            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Assignees</SelectItem>
                                    {assignees.map((assignee) => (
                                        <SelectItem key={assignee.id} value={assignee.id}>{assignee.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Range Filter */}
                        <div className="flex items-center justify-between">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="justify-start text-left font-normal w-[280px]">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {dateRange?.from && dateRange?.to ? (
                                            `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
                                        ) : (
                                            'Filter by due date'
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarButton
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={
                                            (range) => setDateRange(range ?? { from: null, to: null })
                                        }
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>

                            {activeFiltersCount > 0 && (
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                                    </Badge>
                                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                                        <X className="h-4 w-4 mr-1" />
                                        Clear all
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Bulk Actions */}
            {selectedTasks.length > 0 && (
                <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">{selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected</span>
                    <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTasks([])}>
                        Clear Selection
                    </Button>
                </div>
            )}

            {/* Tasks Table */}
            <Card>
                <Table className={`overflow-hidden`}>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTasks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No tasks found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTasks.map((task) => (
                                <TableRow key={task.id} className="hover:bg-muted/50">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedTasks.includes(task.id)}
                                            onCheckedChange={(checked) => handleSelectTask(task.id, checked)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{task.title}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{task.project}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarFallback className="text-xs">
                                                    {task.assignee.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{task.assignee.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value)}>
                                            <SelectTrigger className={`w-[140px] h-8 text-xs border ${getStatusColor(task.status)}`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todo">To Do</SelectItem>
                                                <SelectItem value="in-progress">In Progress</SelectItem>
                                                <SelectItem value="review">In Review</SelectItem>
                                                <SelectItem value="done">Done</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditTask(task)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>Showing {filteredTasks.length} of {tasks.length} tasks</p>
            </div>
        </div>
    );
};

export default TasksPage
