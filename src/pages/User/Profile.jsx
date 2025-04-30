import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Save, Lock, Mail, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/Alert";
import { FaEdit, FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import UseUserUpdatePassword from "@/Apis/User/UpdatePassword";
import { useSnackbar } from "notistack";
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
    linkedin: "alexjohnson",
  },
};

function Profile() {
  const [user, setUser] = useState(dummyUser);
  const { enqueueSnackbar } = useSnackbar();
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    designation: "",
    campus: "",
    department: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [successMessage, setSuccessMessage] = useState("");
  const { updatePassword } = UseUserUpdatePassword();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    let firstName = " ";
    let middleName = " ";
    let lastName = " ";
    const fullName =
      typeof userDetails?.name === "string" ? userDetails.name.trim() : "";
    const nameParts = fullName.split(/\s+/);
    if (nameParts.length === 1) {
      firstName = nameParts[0];
    } else if (nameParts.length === 2) {
      firstName = nameParts[0];
      lastName = nameParts[1];
    } else if (nameParts.length > 2) {
      firstName = nameParts[0];
      lastName = nameParts[nameParts.length - 1];
      middleName = nameParts.slice(1, -1).join(" ");
    }
    setProfileDetails({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: userDetails?.emailId || "",
      phoneNo: userDetails?.mobileNo || "",
      designation: userDetails?.designation || "",
      campus: userDetails?.campus || "",
      department: userDetails?.department || "",
    });
  }, []);

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      const message = "Please fill in all fields.";
      enqueueSnackbar(message, { variant: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      const message = "New Password and Confirm Password do not match.";
      enqueueSnackbar(message, { variant: "error" });
      return;
    }

    try {
      const response = await updatePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // alert(response?.message || 'Password updated successfully!');
    } catch (error) {
      // alert(error?.response?.data?.message || "Password update failed.");
    }
  };

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
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditedUser({
        ...editedUser,
        [parent]: {
          ...editedUser[parent],
          [child]: value,
        },
      });
    } else {
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    // <div className="bg-white text-black">
    //   <div className="container mx-auto py-10 ">
    //     {successMessage && (
    //       <Alert className="mb-6 bg-blue-50 border-blue-200">
    //         <Check className="h-4 w-4 text-blue-600" />
    //         <AlertTitle className="text-blue-600">Success</AlertTitle>
    //         <AlertDescription className="text-blue-600">{successMessage}</AlertDescription>
    //       </Alert>
    //     )}

    //     <div className="flex items-center justify-between mb-8">
    //       <h1 className="text-3xl font-bold text-blue-800"></h1>
    //       {!isEditing && (
    //         <Button
    //           onClick={handleEdit}
    //           className="bg-blue-600 hover:bg-blue-700 text-white"
    //         >
    //           Edit Profile
    //         </Button>
    //       )}
    //     </div>

    //     <div className="flex flex-col gap-8">
    //       {/* Avatar and basic info always on top */}

    //       {/* Tabs Section */}
    //       <Tabs defaultValue="about" className="w-full">
    //         <TabsList className="grid w-full grid-cols-3 bg-blue-50 mb-4">
    //           <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
    //             About
    //           </TabsTrigger>
    //           <TabsTrigger value="account" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
    //             Account
    //           </TabsTrigger>
    //           <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
    //             Update Password
    //           </TabsTrigger>
    //         </TabsList>

    //         {/* About Tab */}
    //         <TabsContent value="about">
    //           <Card className="border-blue-100">
    //             <CardHeader>
    //               <CardTitle className="text-blue-800">About Me</CardTitle>
    //               <CardDescription>Update your personal information</CardDescription>
    //             </CardHeader>
    //             <CardContent className="space-y-4">
    //               <div className="space-y-2">
    //                 <Label htmlFor="bio" className="text-blue-800">Bio</Label>
    //                 {isEditing ? (
    //                   <textarea
    //                     id="bio"
    //                     name="bio"
    //                     value={editedUser.bio}
    //                     onChange={handleInputChange}
    //                     className="w-full h-32 p-2 border border-blue-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
    //                   />
    //                 ) : (
    //                   <p className="text-gray-700">{user.bio}</p>
    //                 )}
    //               </div>

    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                 <div className="space-y-2">
    //                   <Label htmlFor="job" className="text-blue-800">Job Title</Label>
    //                   {isEditing ? (
    //                     <Input id="job" name="job" value={editedUser.job} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
    //                   ) : (
    //                     <p className="text-gray-700">{user.job}</p>
    //                   )}
    //                 </div>
    //                 <div className="space-y-2">
    //                   <Label htmlFor="location" className="text-blue-800">Location</Label>
    //                   {isEditing ? (
    //                     <Input id="location" name="location" value={editedUser.location} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
    //                   ) : (
    //                     <p className="text-gray-700">{user.location}</p>
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="space-y-2">
    //                 <h3 className="text-lg font-medium text-blue-800">Social Profiles</h3>
    //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                   <div className="space-y-2">
    //                     <Label htmlFor="twitter" className="text-blue-800">Twitter</Label>
    //                     {isEditing ? (
    //                       <Input id="twitter" name="social.twitter" value={editedUser.social.twitter} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
    //                     ) : (
    //                       <p className="text-gray-700">{user.social.twitter}</p>
    //                     )}
    //                   </div>
    //                   <div className="space-y-2">
    //                     <Label htmlFor="linkedin" className="text-blue-800">LinkedIn</Label>
    //                     {isEditing ? (
    //                       <Input id="linkedin" name="social.linkedin" value={editedUser.social.linkedin} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
    //                     ) : (
    //                       <p className="text-gray-700">{user.social.linkedin}</p>
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             </CardContent>
    //             {isEditing && (
    //               <CardFooter className="flex justify-end space-x-2">
    //                 <Button variant="outline" onClick={() => setIsEditing(false)} className="border-blue-200 text-blue-800">Cancel</Button>
    //                 <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
    //                   <Save className="mr-2 h-4 w-4" /> Save Changes
    //                 </Button>
    //               </CardFooter>
    //             )}
    //           </Card>
    //         </TabsContent>

    //         {/* Account Tab */}
    //         <TabsContent value="account">
    //           <Card className="border-blue-100">
    //             <CardHeader>
    //               <CardTitle className="text-blue-800">Account Information</CardTitle>
    //               <CardDescription>Update your account details</CardDescription>
    //             </CardHeader>
    //             <CardContent className="space-y-4">
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                 <div className="space-y-2">
    //                   <Label htmlFor="name" className="text-blue-800">Full Name</Label>
    //                   {isEditing ? (
    //                     <Input id="name" name="name" value={editedUser.name} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
    //                   ) : (
    //                     <p className="text-gray-700">{user.name}</p>
    //                   )}
    //                 </div>
    //                 <div className="space-y-2">
    //                   <Label htmlFor="email" className="text-blue-800">Email Address</Label>
    //                   {isEditing ? (
    //                     <Input id="email" name="email" type="email" value={editedUser.email} onChange={handleInputChange} className="border-blue-200 focus:ring-blue-600" />
    //                   ) : (
    //                     <p className="text-gray-700">{user.email}</p>
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="space-y-2">
    //                 <Label htmlFor="avatar" className="text-blue-800">Profile Picture</Label>
    //                 {isEditing ? (
    //                   <div className="flex items-center space-x-4">
    //                     <Avatar className="h-16 w-16">
    //                       <AvatarImage src={editedUser.avatar} />
    //                       <AvatarFallback className="bg-blue-100 text-blue-800">
    //                         {editedUser.name.split(' ').map(n => n[0]).join('')}
    //                       </AvatarFallback>
    //                     </Avatar>
    //                     <Button variant="outline" className="border-blue-200 text-blue-800">
    //                       Change Avatar
    //                     </Button>
    //                   </div>
    //                 ) : (
    //                   <div className="flex items-center space-x-4">
    //                     <Avatar className="h-16 w-16">
    //                       <AvatarImage src={user.avatar} />
    //                       <AvatarFallback className="bg-blue-100 text-blue-800">
    //                         {user.name.split(' ').map(n => n[0]).join('')}
    //                       </AvatarFallback>
    //                     </Avatar>
    //                   </div>
    //                 )}
    //               </div>
    //             </CardContent>
    //             {isEditing && (
    //               <CardFooter className="flex justify-end space-x-2 ">
    //                 <Button variant="outline" onClick={() => setIsEditing(false)} className="border-blue-200 text-blue-800">Cancel</Button>
    //                 <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
    //                   <Save className="mr-2 h-4 w-4 text-white" /> Save Changes
    //                 </Button>
    //               </CardFooter>
    //             )}
    //           </Card>
    //         </TabsContent>

    //         {/* Security Tab */}
    //         <TabsContent value="security">
    //           <Card className="border-blue-100">
    //             <CardHeader>
    //               <CardTitle className="text-blue-800">Security Settings</CardTitle>
    //               <CardDescription>Update your password</CardDescription>
    //             </CardHeader>
    //             <CardContent className="space-y-4">
    //               <div className="space-y-4">
    //                 <div className="space-y-2">
    //                   <Label htmlFor="current" className="text-blue-800">Current Password</Label>
    //                   <Input id="current" name="current" type="password" value={passwords.current} onChange={handlePasswordInput} className="border-blue-200 focus:ring-blue-600" />
    //                 </div>
    //                 <div className="space-y-2">
    //                   <Label htmlFor="new" className="text-blue-800">New Password</Label>
    //                   <Input id="new" name="new" type="password" value={passwords.new} onChange={handlePasswordInput} className="border-blue-200 focus:ring-blue-600" />
    //                 </div>
    //                 <div className="space-y-2">
    //                   <Label htmlFor="confirm" className="text-blue-800">Confirm New Password</Label>
    //                   <Input id="confirm" name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordInput} className="border-blue-200 focus:ring-blue-600" />
    //                   {passwords.new && passwords.confirm && passwords.new !== passwords.confirm && (
    //                     <p className="text-red-500 text-sm mt-1 flex items-center">
    //                       <AlertCircle className="h-4 w-4 mr-1" /> Passwords do not match
    //                     </p>
    //                   )}
    //                 </div>
    //               </div>
    //             </CardContent>
    //             <CardFooter className="flex justify-end">
    //               <Button
    //                 onClick={handlePasswordChange}
    //                 disabled={!passwords.current || !passwords.new || !passwords.confirm || passwords.new !== passwords.confirm}
    //                 className="bg-blue-600 hover:bg-blue-700"
    //               >
    //                 <Lock className="mr-2 h-4 w-4" /> Update Password
    //               </Button>
    //             </CardFooter>
    //           </Card>
    //         </TabsContent>
    //       </Tabs>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="bg-white rounded-[20px] p-10 ml-3 shadow-lg">
        <div className="flex items-center font-bold text-[25px] gap-4 mb-8">
          <FaUser />
          <div>Account Profile Information</div>
        </div>

        <div className="flex justify-between">
          {/* Left side - Input Fields */}
          <div className="flex flex-wrap gap-6 w-[60%]">
            <div className="flex flex-col  w-[32%]">
              <label className="mb-2 font-semibold">First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="border rounded-lg p-2"
                value={profileDetails.firstName}
                // onChange={(e) =>
                //   setProfileDetails({ ...profileDetails, firstName: e.target.value })
                // }
              />
            </div>
            <div className="flex flex-col  w-[32%]">
              <label className="mb-2 font-semibold">Middle Name</label>
              <input
                type="text"
                placeholder="Enter Middle Name"
                className="border rounded-lg p-2"
                value={profileDetails.middleName}
              />
            </div>
            <div className="flex flex-col w-[30.5%]">
              <label className="mb-2 font-semibold">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="border rounded-lg p-2"
                value={profileDetails.lastName}
              />
            </div>
            <div className="flex flex-col w-[48.5%]">
              <label className="mb-2 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="border rounded-lg p-2"
                value={profileDetails.email}
              />
            </div>
            <div className="flex flex-col w-[48.5%]">
              <label className="mb-2 font-semibold">Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="border rounded-lg p-2"
                value={profileDetails.phoneNo}
              />
            </div>
            <div className="flex flex-col w-[48.5%]">
              <label className="mb-2 font-semibold">Designation</label>
              <input
                type="text"
                placeholder="Enter Designation"
                className="border rounded-lg p-2"
                value={profileDetails.designation}
              />
            </div>
            <div className="flex flex-col w-[48.5%]">
              <label className="mb-2 font-semibold">Campus</label>
              <input
                type="text"
                placeholder="Enter Campus"
                className="border rounded-lg p-2"
                value={profileDetails.campus}
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <label className="mb-2 font-semibold">Department</label>
              <input
                type="text"
                placeholder="Enter Department"
                className="border rounded-lg p-2"
                value={profileDetails.department}
              />
            </div>
          </div>

          {/* Right side - Profile Photo and Save Button */}
          {/* Right side - Profile Photo and Save Button */}
          <div className="flex flex-col justify-between items-center w-[30%]">
            <div className="relative w-40 h-40 rounded-full bg-gray-200 overflow-hidden group">
              {/* Profile photo */}
              <div className="w-full h-full object-cover bg-[#002946] text-white flex items-center justify-center text-[4rem] font-bold">
                {userDetails?.name
                  ? userDetails.name
                      .trim()
                      .split(" ")
                      .map((n, i, arr) =>
                        i === 0 || i === arr.length - 1 ? n[0] : ""
                      )
                      .join("")
                      .toUpperCase()
                  : ""}
              </div>
              {/* <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              /> */}
              {/* Edit icon shown on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <FaEdit className="text-white text-3xl" />
              </div>
            </div>
            {/* <button className="bg-[#002946] text-white px-6 py-2 w-[25%] rounded-lg text-lg hover:bg-[#002946cb]">
              Save
            </button> */}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[20px] p-10 ml-3 mt-10 shadow-lg">
        <div className="flex items-center font-bold text-[25px] gap-4 mb-8">
          <MdOutlinePassword />
          <div>Update Password</div>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-6 w-[70%]">
            <div className="flex flex-col relative">
              <label htmlFor="old-password" className="font-semibold text-lg">
                Old Password *
              </label>
              <input
                type={showOld ? 'text' : 'password'}
                id="old-password"
                placeholder="Enter Old Password"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#002946] transition-all"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
              className="absolute right-3 top-[45px] cursor-pointer text-gray-500"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="new-password" className="font-semibold text-lg">
                New Password *
              </label>
              <input
                type={showNew ? 'text' : 'password'}
                id="new-password"
                placeholder="Enter New Password"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#002946] transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
              className="absolute right-3 top-[45px] cursor-pointer text-gray-500"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
            </div>

            <div className="flex flex-col relative">
              <label
                htmlFor="confirm-password"
                className="font-semibold text-lg"
              >
                Confirm New Password *
              </label>
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Confirm New Password"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#002946] transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
              className="absolute right-3 top-[45px] cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
            </div>
          </div>

          {/* Right side - Save Button */}
          <div className="flex flex-col justify-end w-[25%] items-end">
            <button
              className="bg-[#002946] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#002946cb] transition-all"
              onClick={handlePasswordUpdate}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
