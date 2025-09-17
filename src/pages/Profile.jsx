import {
  Calendar,
  Camera,
  CheckCircle,
  Mail,
  Save,
  Shield,
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { useAuth } from "./contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Alert, AlertDescription } from "./components/ui/alert";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  if (!user) return null;

  // Need set to connect data, recent, The data is setting hardcode
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateProfile({
        name: formData.name,
        email: formData.email,
      });
      setEditMode(false);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Successfully!");
      setShowPasswordSection(false);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

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
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -right-2 -bottom-2 size-8 rounded-full p-0"
                >
                  <Camera className="size-4" />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-medium">{user.name}</h3>
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
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={() => {}}
                  disabled={!editMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={() => {}}
                  disabled={!editMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={() => {}}
                  disabled={!editMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={() => {}}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">bio</Label>
              <Input
                id="bio"
                name="bio"
                value={name}
                onChange={() => {}}
                disabled={!editMode}
                placeholder="Tell us about yourself"
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
    </div>
  );
};

export default Profile;
