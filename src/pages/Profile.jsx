import {
    Calendar,
    Camera,
    CheckCircle,
    Mail,
    Save,
    Shield,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { updateProfileThunk } from "../features/auth/authThunk";
import { ImageDialog } from "../components";
import { uploadUserImageThunk } from "../features/users/userThunk";

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);

    if (!user) return null;

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        address: user?.address || "",
        phone: user?.phone || "",
        image: user?.image || null,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const validareForm = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            return false
        }
        if (formData.newPassword.length < 6) {
            return false
        }
        return true
    }

    const getPasswordStrength = (newPassword) => {
        let strength = 0;
        if (newPassword.length >= 6) strength++;
        if (newPassword.match(/[a-z]/) && newPassword.match(/[A-Z]/)) strength++;
        if (newPassword.match(/\d/)) strength++;
        if (newPassword.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    }
    const passwordStrength = getPasswordStrength(formData.newPassword)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const { username, email, address, phone } = formData
            await dispatch(updateProfileThunk({ data: { username, email, address, phone } })).unwrap();

            setEditMode(false);
            toast.success("Updated successfully!");
        } catch (err) {
            toast.error(err.message || "Update failed")
        } finally {
            setLoading(false);
        }
    };
    const handleChangePassword = async () => {
        if (!validareForm()) return;
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Successfully!")
            setShowPasswordSection(false);
        } catch (error) {
            toast.error(err.message || "Update failed")
        } finally {
            setLoading(false);
        }
    };

    //Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mode, setMode] = useState("view")

    const handlePickFile = async (file) => {
        try {
            if (!file.type.startsWith("image/")) toast.error("Please choose an image");
            if (file.size > 5 * 1024 * 1024) toast.error("Max 5MB");
            if (file) {
                const fd = new FormData()
                fd.append("avatar", file, file.name);
                if (fd) {
                    // for (const [k, v] of fd.entries()) console.log(k, v);
                    await dispatch(uploadUserImageThunk({ userId: user._id, file: fd })).unwrap()
                }
            }
            toast.success("Avatar updated")
        } catch (err) {
            toast.error(err?.message || "Upload failed")
        }
    }

    const handleRemoveAvatar = async () => {
        try {
            // sever remove
            toast.success("Avatar removed")
        } catch (err) {
            toast.error(err?.message || "Remove failed")
        }
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and preferences
                    </p>
                </div>
                <Badge className="flex items-center gap-1">
                    <Shield className="size-3" />
                    {user.role}
                </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Profile Picture and Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                        <CardDescription>
                            Update your profile picture and basic information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <Avatar className="size-24">
                                    <AvatarImage src={user.image || undefined} alt={user.username} />
                                    <AvatarFallback className="text-2xl">
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    size="sm"
                                    variant="icon"
                                    className="absolute -right-2 -bottom-2 size-8 rounded-full p-0 bg-muted cursor-pointer hover:bg-muted-foreground hover:text-muted"
                                    onClick={() => {
                                        setDialogOpen(true)
                                        setMode("view")
                                    }}
                                >
                                    <Camera className="size-4" />
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3 className="font-medium">{user.username}</h3>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="text-muted-foreground size-4" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="text-muted-foreground size-4" />
                                    <span>
                                        Joined {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="size-4 text-green-500" />
                                    <span>Email verified</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Presonal Information */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </div>
                        <Button
                            variant={editMode ? "outline" : "default"}
                            onClick={() => setEditMode(!editMode)}
                        >
                            {editMode ? "Cancel" : "Edit"}
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="username">User Name</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username.trim()}
                                    onChange={handleChange}
                                    autoComplete="on"
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    placeholder="123-45-678"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    autoComplete="on"
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email.trim()}
                                onChange={handleChange}
                                autoComplete="on"
                                disabled={!editMode}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                autoComplete="on"
                                disabled={!editMode}
                                placeholder="Enter your address"
                                rows={3}
                            />
                        </div>
                        {editMode && (
                            <div className="flex justify-end">
                                <Button onClick={handleSaveProfile} disabled={loading}>
                                    <Save className="mr-2 size-4" />
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                {/* Security Settings */}
                <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>
                                Manage your password and security preferences
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setShowPasswordSection(!showPasswordSection)}
                        >
                            {showPasswordSection ? <>Hide</> : <>Change Password</>}
                        </Button>
                    </CardHeader>
                    {!showPasswordSection && <div></div>}
                    {showPasswordSection && (
                        <CardContent className="space-y-4">
                            <Alert>
                                <Shield className="size-4" />
                                <AlertDescription>
                                    {" "}
                                    For your security, please enter your current password to
                                    change to a new one.
                                </AlertDescription>
                            </Alert>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                    />
                                    {formData.newPassword && (
                                        <div className="space-y-1">
                                            <div className="flex gap-1">
                                                {[...Array(4)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 w-full rounded ${i < passwordStrength
                                                            ? passwordStrength <= 1
                                                                ? "bg-red-500"
                                                                : passwordStrength <= 2
                                                                    ? "bg-yellow-500"
                                                                    : "bg-green-500"
                                                            : "bg-muted"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-muted-foreground text-xs">
                                                Password strength:{" "}
                                                {passwordStrength <= 1
                                                    ? "Weak"
                                                    : passwordStrength <= 2
                                                        ? "Fair"
                                                        : passwordStrength <= 3
                                                            ? "Good"
                                                            : "Strong"
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Enter confirm password"
                                    />
                                    {formData.confirmPassword &&
                                        formData.newPassword === formData.confirmPassword && (
                                            <div className="flex items-center gap-1 text-green-600">
                                                <CheckCircle className="h-3 w-3" />
                                                <span className="text-xs">Passwords match</span>
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button onClick={handleChangePassword} disabled={loading}>
                                    <Shield className="mr-2 size-4" />
                                    {loading ? "Updating..." : "Update password"}
                                </Button>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>

            {/* Dialog setup Image */}
            <ImageDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                mode={mode}
                setMode={setMode}
                imageUrl={user?.image || null}
                fallbackChar={(user.username || "U")[0].toUpperCase()}
                onPickFile={handlePickFile}
                onRemove={handleRemoveAvatar}
            />
        </div>
    );
};

export default Profile;
