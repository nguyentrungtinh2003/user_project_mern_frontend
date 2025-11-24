import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

const UserDialog = (props) => {
  const [editPicture, setEditPicture] = useState(false)
  if (true) {
    return (
      <Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
        <DialogContent> true</DialogContent>
      </Dialog>
    )
  }

  // return (
  //   <Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>{props.editingUser ? "Edit User" : "Create New User"}</DialogTitle>
  //         <DialogDescription>{props.editingUser ? "Update user information" : "Add a new user to the system"}</DialogDescription>
  //       </DialogHeader>

  //       <div className="space-y-4">
  //         <div className="space-y-2">
  //           <Label htmlFor="firstName">First Name</Label>
  //           <Input
  //             id="firstName"
  //             value={props.formData.firstName}
  //             onChange={(e) => props.setFromData({ ...props.formData, firstName: e.target.value })}
  //             placeholder="Enter first name"
  //           />
  //         </div>
  //         <div className="space-y-2">
  //           <Label htmlFor="email">Email</Label>
  //           <Input
  //             id="email"
  //             type="email"
  //             value={props.formData.email}
  //             onChange={(e) => props.setFromData({ ...props.formData, email: e.target.value })}
  //             placeholder="Enter email address"
  //           />
  //         </div>
  //         <div className="space-y-2">
  //           <Label htmlFor="role">Role</Label>
  //           <Select
  //             value={props.formData.role}
  //             onValueChange={(value) => props.setFromData({ ...props.formData, role: value })}
  //           >
  //             <SelectTrigger>
  //               <SelectValue />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectItem value="admin">Administrator</SelectItem>
  //               <SelectItem value="user">User</SelectItem>
  //             </SelectContent>
  //           </Select>
  //         </div>
  //         <div className="space-y-2">
  //           <Label htmlFor="status">Status</Label>
  //           <Select
  //             value={props.formData.status}
  //             onValueChange={(value) => props.setFromData({ ...props.formData, status: value })}
  //           >
  //             <SelectTrigger>
  //               <SelectValue />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectItem value="active">Active</SelectItem>
  //               <SelectItem value="inactive">Inactive</SelectItem>
  //             </SelectContent>
  //           </Select>
  //         </div>
  //         <div className="flex justify-end gap-2">
  //           <Button
  //             variant="outline"
  //             onClick={() => props.setDialogOpen(false)}
  //           >
  //             Cancel
  //           </Button>
  //           <Button onClick={props.handleSaveUser}>
  //             {props.editingUser ? "Update User" : "Create User"}
  //           </Button>
  //         </div>
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // )
}

export default UserDialog;
