import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { Calendar, CloudAlert, Edit, Loader, Mail, MoreHorizontal, Shield, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsersThunk } from "../userThunk";

export const TableUsers = (props) => {

    const dispatch = useDispatch()

    const { list: users, status, error } = useSelector(s => s.user)

    const listUser = users || []


    useEffect(() => {
        dispatch(fetchAllUsersThunk())
    }, [dispatch]);


    if (status === 'loading') return (
        <div className="rounded-md border flex items-center justify-center text-muted-foreground py-10 text-sm font-medium">
            <Loader className="size-4 mr-2 animate-spin" />
            Loading users...
        </div>
    )

    if (status === 'failed') return (
        <div className="rounded-md border flex items-center justify-center text-red-400 py-10 text-sm font-medium">
            <CloudAlert className="size-4 mr-2" />
            Error: {error?.message ?? 'Unknown'}!
        </div>
    )

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listUser.map((user) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar  >
                                            <AvatarImage src={user.image} />
                                            <AvatarFallback className="size-10 font-semibold text-muted-foreground">
                                                {user.firstName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.firstName}</div>
                                            <div className="text-muted-foreground flex items-center gap-1 text-sm">
                                                <Mail className="size-3" /> {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={props.getRoleColor(user.role)}
                                        className="flex w-fit items-center gap-1"
                                    >
                                        <Shield className="size-3" /> {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={props.getStatusColor(user.status)}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                                        <Calendar className="size-3" />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {user.lastLogin ? (
                                        <div className="text-muted-foreground text-sm">
                                            {new Date(user.lastLogin).toLocaleDateString()}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground text-sm">Never</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => props.handleEditUser(user)}>
                                                <Edit className="mr-2 size-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => props.handleDeleteUser(user.id)}
                                            >
                                                <Trash2 className="mr-2 size-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
