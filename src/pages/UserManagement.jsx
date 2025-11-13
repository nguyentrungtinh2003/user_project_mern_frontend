import {
    Calendar,
    Edit,
    Filter,
    Mail,
    MoreHorizontal,
    Plus,
    Search,
    Shield,
    Trash2,
    Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { UserDialog } from "../components";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { TableUsers } from "../features/users/components/TableUsers";
import { useDispatch, useSelector } from "react-redux";
// import { createUserThunk, fetchAllUsersThunk, updateUserThunk } from "../features/users/userThunk";

// const UserManagement = () => {
//     // data users
//     const [users, setUsers] = useState([
//         {
//             id: "1",
//             name: "John Doe",
//             email: "johndoe@gmail.com",
//             role: "admin",
//             status: "active",
//             createdAt: "2024-01-15T10:00:00Z",
//             lastLogin: "lastLogin",
//         },
//         {
//             id: "2",
//             name: "John Doe1",
//             email: "johndoe1@gmail.com",
//             role: "user",
//             status: "active",
//             createdAt: "2024-01-15T10:00:00Z",
//             lastLogin: "lastLogin",
//         },
//         {
//             id: "3",
//             name: "John Doe2",
//             email: "johndoe2@gmail.com",
//             role: "user",
//             status: "inactive",
//             createdAt: "2024-01-15T10:00:00Z",
//             lastLogin: "lastLogin",
//         },
//     ]);



//     // render Card Start
//     const stats = useMemo(() => {
//         const c = users.reduce((a, u) => {
//             a.total++
//             if (u.status === "active") a.active++
//             if (u.role === "admin") a.admin++
//             if (u.role === "user") a.regular++
//             return a;
//         }, { total: 0, active: 0, admin: 0, regular: 0 })

//         return [
//             { id: 1, cardTitle: "Total Users", icon: Users, data: c.total },
//             { id: 2, cardTitle: "Active Users", icon: Users, data: c.active },
//             { id: 3, cardTitle: "Administrators", icon: Shield, data: c.admin },
//             { id: 4, cardTitle: "Regular Users", icon: Users, data: c.regular },
//         ]
//     }, [users])

//     // filtered Users
//     const [searchTerm, setSearchTerm] = useState("");
//     const [roleFilter, setRoleFilter] = useState("all");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const filteredUsers = users.filter((user) => {
//         const matchesSearch =
//             user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.email.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesRole = roleFilter === "all" || user.role === roleFilter;
//         const matchesStatus = statusFilter === "all" || user.status === statusFilter;
//         return matchesSearch && matchesRole && matchesStatus;
//     });

//     const getRoleColor = (role) => {
//         return role === "admin" ? "default" : "secondary";
//     };

//     const getStatusColor = (status) => {
//         return status === "active" ? "default" : "secondary";
//     };

//     const [formData, setFromData] = useState({
//         name: "",
//         email: "",
//         role: "user",
//         status: "active",
//     });
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [editingUser, setEditingUser] = useState(null);

//     const handleEditUser = (user) => {
//         setEditingUser(user);
//         setFromData({
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             status: user.status,
//         });
//         setDialogOpen(true);
//     };

//     const handleCreateUser = () => {
//         setEditingUser(null)
//         setFromData({
//             name: "",
//             email: "",
//             role: "user",
//             status: "active",
//         })
//         setDialogOpen(true)
//     }

//     const handleDeleteUser = (userId) => {
//         setUsers(users.filter((user) => user && user.id !== userId));
//         toast.success('User deleted successfully');
//     };

//     const handleSaveUser = () => {
//         if (editingUser) {
//             setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...formData } : user));
//             toast.success("User updated successfully")
//         } else {
//             if (formData.name === "" || formData.email === "") {
//                 toast.warning("Value user anh email emty")
//                 return
//             } else {
//                 const newUser = {
//                     id: Date.now().toString(),
//                     ...formData,
//                     createdAt: new Date().toISOString()
//                 }
//                 setUsers([...users, newUser])
//                 toast.success('User created successfully');
//             }
//         };
//         setDialogOpen(false);
//     }
//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold">User Management</h1>
//                     <p className="text-muted-foreground">
//                         Manage system users and their permissions
//                     </p>
//                 </div>
//                 <Button onClick={handleCreateUser}>
//                     <Plus className="mr-2 size-4" />
//                     Add User
//                 </Button>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//                 {stats.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                         <Card key={item.id}>
//                             <CardHeader className="flex items-center justify-between space-y-0 pb-2">
//                                 <CardTitle className="text-sm font-medium">
//                                     {item.cardTitle}
//                                 </CardTitle>
//                                 <Icon
//                                     className={
//                                         item.cardTitle === "Active Users"
//                                             ? `size-4 text-green-500`
//                                             : `text-muted-foreground size-4`
//                                     }
//                                 />
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="text-2xl font-bold">{item.data}</div>
//                             </CardContent>
//                         </Card>
//                     );
//                 })}
//             </div>

//             {/* Filters and Search */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Users</CardTitle>
//                     <CardDescription>Search and filter users</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="mb-6 flex flex-col gap-4 md:flex-row">
//                         {/* Search bar */}
//                         <div className="relative flex-1">
//                             <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
//                             <Input className="pl-10" placeholder="Search users..." />
//                         </div>

//                         {/* Select roles */}
//                         <Select value={roleFilter} onValueChange={setRoleFilter}>
//                             <SelectTrigger className="w-full md:w-[180px]">
//                                 <Filter className="size-4 mr-2" />
//                                 <SelectValue placeholder="Filter by role" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Roles</SelectItem>
//                                 <SelectItem value="admin">Admin</SelectItem>
//                                 <SelectItem value="user">User</SelectItem>
//                             </SelectContent>
//                         </Select>

//                         {/* Select status */}
//                         <Select value={statusFilter} onValueChange={setStatusFilter}>
//                             <SelectTrigger className="w-full md:w-[180px]">
//                                 <SelectValue placeholder="Filter by status" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Status</SelectItem>
//                                 <SelectItem value="active">Active</SelectItem>
//                                 <SelectItem value="inactive">Inactive</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     {/* Users Table */}
//                     <div className="rounded-md border">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>User</TableHead>
//                                     <TableHead>Role</TableHead>
//                                     <TableHead>Status</TableHead>
//                                     <TableHead>Created</TableHead>
//                                     <TableHead>Last Login</TableHead>
//                                     <TableHead className="text-right">Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {filteredUsers.map((user) => {
//                                     return (
//                                         <TableRow key={user.id}>
//                                             <TableCell>
//                                                 <div className="flex items-center gap-3">
//                                                     <Avatar>
//                                                         <AvatarFallback className="size-8">
//                                                             {user.name.charAt(0).toUpperCase()}
//                                                         </AvatarFallback>
//                                                     </Avatar>
//                                                     <div>
//                                                         <div className="font-medium">{user.name}</div>
//                                                         <div className="text-muted-foreground flex items-center gap-1 text-sm">
//                                                             <Mail className="size-3" /> {user.email}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Badge
//                                                     variant={getRoleColor(user.role)}
//                                                     className="flex w-fit items-center gap-1"
//                                                 >
//                                                     <Shield className="size-3" /> {user.role}
//                                                 </Badge>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Badge variant={getStatusColor(user.status)}>
//                                                     {user.status}
//                                                 </Badge>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div className="text-muted-foreground flex items-center gap-1 text-sm">
//                                                     <Calendar className="size-3" />
//                                                     {new Date(user.createdAt).toLocaleDateString()}
//                                                 </div>
//                                             </TableCell>
//                                             <TableCell>
//                                                 {user.lastLogin ? (
//                                                     <div className="text-muted-foreground text-sm">
//                                                         {new Date(user.lastLogin).toLocaleDateString()}
//                                                     </div>
//                                                 ) : (
//                                                     <span className="text-muted-foreground text-sm">
//                                                         Never
//                                                     </span>
//                                                 )}
//                                             </TableCell>
//                                             <TableCell className="text-right">
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" size="sm">
//                                                             <MoreHorizontal className="size-4" />
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem
//                                                             onClick={() => handleEditUser(user)}
//                                                         >
//                                                             <Edit className="mr-2 size-4" />
//                                                             Edit
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem
//                                                             className="text-destructive"
//                                                             onClick={() => handleDeleteUser(user.id)}
//                                                         >
//                                                             <Trash2 className="mr-2 size-4" />
//                                                             Delete
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </TableCell>
//                                         </TableRow>
//                                     );
//                                 })}
//                             </TableBody>
//                         </Table>
//                     </div>
//                     <TableUsers
//                         getRoleColor={getRoleColor}
//                         getStatusColor={getStatusColor}
//                         handleEditUser={handleEditUser}
//                         handleDeleteUser={handleDeleteUser}
//                     />

//                 </CardContent>
//             </Card>

//             {/* User Dialog */}
//             <UserDialog
//                 dialogOpen={dialogOpen}
//                 setDialogOpen={setDialogOpen}
//                 editingUser={editingUser}
//                 formData={formData}
//                 setFromData={setFromData}
//                 handleSaveUser={handleSaveUser}
//             />
//         </div>
//     );
// };

// const UserManagement = () => {
//     const dispatch = useDispatch();
//     const { list: users, status, err } = useSelector(s => s.user)
//     useEffect(() => {
//         if (status === 'idle') dispatch(fetchAllUsersThunk())
//         console.log('>>check:', users, '>>status:', status, '>>error:', err)
//     }, [status, dispatch])

//     const stats = useMemo((() => {
//         const c = users.reduce((a, u) => {
//             a.total++
//             if (u.status === "active") a.active++
//             if (u.role === "admin") a.admin++
//             if (u.role === "user") a.regular++
//             return a
//         }, { total: 0, active: 0, admin: 0, regular: 0 })

//         return [
//             { id: 1, cardTitle: "Total Users", icon: Users, data: c.total },
//             { id: 2, cardTitle: "Active Users", icon: Users, data: c.active },
//             { id: 3, cardTitle: "Administrators", icon: Shield, data: c.admin },
//             { id: 4, cardTitle: "Regular Users", icon: Users, data: c.regular },
//         ]
//     }), [users])

//     const [editingUser, setEditingUser] = useState(null)
//     const [formData, setFromData] = useState({
//         firstName: "",
//         email: "",
//         role: "user",
//         status: "active",
//     })
//     const [dialogOpen, setDialogOpen] = useState(false)


//     const handleCreateUser = () => {
//         setEditingUser(null)
//         setFromData({
//             firstName: "",
//             email: "",
//             role: "user",
//             status: "active",
//         })
//         setDialogOpen(true)
//     }

//     const handleSaveUser = async () => {
//         try {
//             if (editingUser) {
//                 await (dispatch(updateUserThunk({ id: editingUser.id, data: formData }))).unwrap()
//                 console.log('check data:', formData)
//                 toast.success('User updated successfully')
//             } else {
//                 if (!formData.firstName || !formData.email) return toast.warning('Name/Email is required')
//                 await (dispatch(createUserThunk(formData))).unwrap()

//                 toast.success('User created successfully')
//                 console.log("Check created:", formData)
//             }
//             setDialogOpen(false)
//         } catch (err) {
//             toast.error(err?.message || 'Save failed')
//         }
//     }

//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold">User Management</h1>
//                     <p className="text-muted-foreground">
//                         Manage system users and their permissions
//                     </p>
//                 </div>
//                 <Button onClick={handleCreateUser}>
//                     <Plus className="mr-2 size-4" />
//                     Add User
//                 </Button>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//                 {stats.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                         <Card key={item.id}>
//                             <CardHeader className="flex items-center justify-between space-y-0 pb-2">
//                                 <CardTitle className="text-sm font-medium">
//                                     {item.cardTitle}
//                                 </CardTitle>
//                                 <Icon
//                                     className={
//                                         item.cardTitle === "Active Users"
//                                             ? `size-4 text-green-500`
//                                             : `text-muted-foreground size-4`
//                                     }
//                                 />
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="text-2xl font-bold">{item.data}</div>
//                             </CardContent>
//                         </Card>
//                     );
//                 })}
//             </div>

//             {/* Filters and Search */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Users</CardTitle>
//                     <CardDescription>Search and filter users</CardDescription>
//                 </CardHeader>
//             </Card>

//             {/* User Dialog */}
//             <UserDialog
//                 dialogOpen={dialogOpen}
//                 setDialogOpen={setDialogOpen}
//                 editingUser={editingUser}
//                 formData={formData}
//                 setFromData={setFromData}
//                 handleSaveUser={handleSaveUser}
//             />
//         </div>
//     )

// }

export default UserManagement;
