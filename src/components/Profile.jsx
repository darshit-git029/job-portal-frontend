
import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDailog from "./UpdateProfileDailog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const isResume = false
const Profile = () => {
    useGetAppliedJobs();
    const [open,setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth)
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div className="">
                            <h1 className="font-medium text-xl">{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-4 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="">
                    <h1 className="font-bold mb-3">Skills</h1>
                    <div className="flex gap-2">
                        {
                            user?.Profile?.skills.length != 0 ? (user?.profile?.skills.map((item, index) => (
                                <Badge key={index}>{item}</Badge>))) :(<span>NA</span>)
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1 mt-5">
                        <Label className="font-bold text-md">Resume</Label>
                        {
                            user?.profile?.resume ? (<a target="blank" href={user?.profile?.resume} className="text-blue-500 hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>) :( <span>NA</span>)
                        }
                </div>
            </div>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                    <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                    <AppliedJobTable/>
                </div>
                <UpdateProfileDailog open ={open} setOpen = {setOpen}/>
        </div>

    );
};

export default Profile;
