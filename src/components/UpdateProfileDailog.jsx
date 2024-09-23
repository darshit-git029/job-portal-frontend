/* eslint-disable react/prop-types */

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/costent"
import {  setUser } from "@/redux/authSlice"
import { toast } from "sonner"

const UpdateProfileDailog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    
    const { user } = useSelector(store=>store.auth)


    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })



    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const dispatch = useDispatch();

    // const { token } = useSelector(store => store.auth);
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true); // Start loading

        const formData = new FormData()
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)

        if (input.file) {
            formData.append("file", input.file)
        }

        try {

            if (!token) {
                throw new Error("Token not found, please login again.");
            }
            console.log({
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
              });
          
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    "Content-Type": "multipart/form-data"
                 },
                })

                console.log('Response data:', res.data);

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message)
          
        } finally {
            setLoading(false); // Stop loading
            setOpen(false);
        }
        
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm-max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right text-md">Name</Label>
                                <Input
                                    id="name"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right text-md">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="text-right text-md">Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right text-md">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right text-md">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right text-md">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                </Button>
                            ) : (
                                <Button className="w-full my-4" type="submit">
                                    Update
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDailog
