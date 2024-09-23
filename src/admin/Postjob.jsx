/* eslint-disable react/jsx-key */
import Navbar from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JOB_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const Postjob = () => {
    const navigate = useNavigate()
    const [loading, setLoader] = useState(false)
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirement: "",
        salary: "",
        location: "",
        position: "",
        experience: "",
        jobType: "",
        companyID: "",
        // createtd_by:""
    })

    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input);

    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        setInput({ ...input, companyID: selectedCompany._id })
    }
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');

    const submitHandler = async (e) => {
        console.log("is", input);

        e.preventDefault()
        try {
            setLoader(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                console.log(res.data);
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoader(false)
        }
    }


    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-10 text-left">

                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-2xl rounded-md">
                    <div className="items-center font-bold text-xl mb-7">Create New Job</div>
                    <div className="grid grid-cols-2 gap-3">

                        <div className="">
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div>
                        <div className="">
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div><div className="">
                            <Label>requirement</Label>
                            <Input
                                type="text"
                                name="requirement"
                                value={input.requirement}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div><div className="">
                            <Label>salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div><div className="">
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div><div className="">
                            <Label>No Of Position </Label>
                            <Input
                                type="text"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div>
                        <div className="">
                            <Label>Exprerince Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div>
                        <div className="">
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                        </div>
                        {
                            companies.length != 0 && (
                                <Select className="w-full" onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button className="w-full my-4" type="submit">
                            Post New Job
                        </Button>
                    }
                    {
                        companies.length === 0 && <p className="text-xs font-bold text-red-600 text-center my-3">*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>

        </div>
    )
}
export default Postjob    