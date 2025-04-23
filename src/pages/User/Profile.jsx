import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '../../components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  AlertCircle, Check, Save, Lock, Mail, MapPin
} from 'lucide-react';
import {
  Alert, AlertDescription, AlertTitle
} from '../../components/ui/Alert';

// Dummy user data
const dummyUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/api/placeholder/150/150",
  job: "Senior Product Designer",
  location: "San Francisco, CA",
  bio: "Product designer with 5+ years of experience in creating intuitive digital experiences. Passionate about user-centered design and accessibility.",
  social: {
    twitter: "@alexjohnson",
    linkedin: "alexjohnson"
  }
};

function Profile() {
  const [user, setUser] = useState(dummyUser);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) return;
    setPasswords({ current: "", new: "", confirm: "" });
    setSuccessMessage("Password updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedUser({
        ...editedUser,
        [parent]: {
          ...editedUser[parent],
          [child]: value
        }
      });
    } else {
      setEditedUser({
        ...editedUser,
        [name]: value
      });
    }
  };

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto py-10 ">
        {successMessage && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Check className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-600">Success</AlertTitle>
            <AlertDescription className="text-blue-600">{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-800"></h1>
          {!isEditing && (
            <Button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit Profile
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {/* Avatar and basic info always on top */}
         

          {/* Tabs Section */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-blue-50 mb-4">
              <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                About
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Update Password
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-800">About Me</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-blue-800">Bio</Label>
                    {isEditing ? (
                      <textarea
                        id="bio"
                        name="bio"
                        value={editedUser.bio}
                        onChange={handleInputChange}
                        className="w-full h-32 p-2 border border-blue-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    ) : (
                      <p className="text-gray-700">{user.bio}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job" className="text-blue-800">Job Title</Label>
                      {isEditing ? (
                        <Input id="job" name="job" value={editedUser.job} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
                      ) : (
                        <p className="text-gray-700">{user.job}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-blue-800">Location</Label>
                      {isEditing ? (
                        <Input id="location" name="location" value={editedUser.location} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
                      ) : (
                        <p className="text-gray-700">{user.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-blue-800">Social Profiles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="text-blue-800">Twitter</Label>
                        {isEditing ? (
                          <Input id="twitter" name="social.twitter" value={editedUser.social.twitter} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
                        ) : (
                          <p className="text-gray-700">{user.social.twitter}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-blue-800">LinkedIn</Label>
                        {isEditing ? (
                          <Input id="linkedin" name="social.linkedin" value={editedUser.social.linkedin} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
                        ) : (
                          <p className="text-gray-700">{user.social.linkedin}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="border-blue-200 text-blue-800">Cancel</Button>
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-800">Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-800">Full Name</Label>
                      {isEditing ? (
                        <Input id="name" name="name" value={editedUser.name} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
                      ) : (
                        <p className="text-gray-700">{user.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-800">Email Address</Label>
                      {isEditing ? (
                        <Input id="email" name="email" type="email" value={editedUser.email} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
                      ) : (
                        <p className="text-gray-700">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar" className="text-blue-800">Profile Picture</Label>
                    {isEditing ? (
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={editedUser.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {editedUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="border-blue-200 text-blue-800">
                          Change Avatar
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="border-blue-200 text-blue-800">Cancel</Button>
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-800">Security Settings</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current" className="text-blue-800">Current Password</Label>
                      <Input id="current" name="current" type="password" value={passwords.current} onChange={handlePasswordInput} className="border-blue-200 focus:ring-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new" className="text-blue-800">New Password</Label>
                      <Input id="new" name="new" type="password" value={passwords.new} onChange={handlePasswordInput} className="border-blue-200 focus:ring-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm" className="text-blue-800">Confirm New Password</Label>
                      <Input id="confirm" name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordInput} className="border-blue-200 focus:ring-blue-600" />
                      {passwords.new && passwords.confirm && passwords.new !== passwords.confirm && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handlePasswordChange}
                    disabled={!passwords.current || !passwords.new || !passwords.confirm || passwords.new !== passwords.confirm}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Lock className="mr-2 h-4 w-4" /> Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
