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

const UserDialog = (props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpenChange}>
      <DialogContent>
        <DialogHeader>
          DialogHeader
          <DialogTitle>DialogTitle</DialogTitle>
          <DialogDescription>DialogDescription</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="">Label</Label>
            <Input id="" value="" onChange={() => {}} placeholder="Input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="">Label</Label>
            <Input id="" value="" onChange={() => {}} placeholder="Input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="">Label</Label>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item1">item1</SelectItem>
                <SelectItem value="item2">item1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="">Label</Label>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item1">item1</SelectItem>
                <SelectItem value="item2">item1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => props.setOpenChange(false)}
            >
              Cancel
            </Button>
            <Button>{false ? "Update User" : "Create User"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
