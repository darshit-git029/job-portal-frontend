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
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirement: "",
        salary: "",
        location: "",
        position: "",
        experience: "",
        jobType: "",
        companyID: "", // Initially empty for company selection
    })

    const { companies } = useSelector(store => store.company)

    // Input Change Handler
    const changeEventHandler = (e) => {
        const { name, value } = e.target

        // Check for number-only fields and required fields
        if (["salary", "position", "experience"].includes(name)) {
            if (isNaN(value) || value.trim() === "") {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "This field requires a numeric value",
                }))
                return
            } else {
                setErrors((prev) => ({ ...prev, [name]: "" }))
            }
        }

        if (value.trim() === "") {
            setErrors((prev) => ({
                ...prev,
                [name]: "This field is required",
            }))
        } else {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }

        setInput({ ...input, [name]: value })
    }

    // Company Selection Handler
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        if (selectedCompany) {
            setInput({ ...input, companyID: selectedCompany._id })
            setErrors((prev) => ({ ...prev, companyID: "" })) // Clear error if selection is valid
        } else {
            setErrors((prev) => ({ ...prev, companyID: "Please select a company" }))
        }
    }

    // Get Token
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');

    // Form Submit Handler
    const submitHandler = async (e) => {
        e.preventDefault()

        // Validate Form Inputs
        const newErrors = {}

        // Check if each field is filled
        Object.keys(input).forEach((key) => {
            if (!input[key] && key !== "companyID") {
                newErrors[key] = "This field is required"
            }
        })

        // Check if salary, position, and experience are numeric
        if (!input.salary || isNaN(input.salary)) {
            newErrors.salary = "Salary must be a numeric value"
        }
        if (!input.position || isNaN(input.position)) {
            newErrors.position = "Position must be a numeric value"
        }
        if (!input.experience || isNaN(input.experience)) {
            newErrors.experience = "Experience must be a numeric value"
        }

        // Check if company is selected
        if (!input.companyID) {
            newErrors.companyID = "Please select a company"
        }

        // Set Errors
        setErrors(newErrors)

        // If there are errors, do not submit the form
        if (Object.keys(newErrors).length > 0) {
            toast.error("Please fix all errors before submitting the form")
            return
        }

        try {
            setLoader(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }

        } catch (error) {
            console.log(error)
            toast.error("An error occurred while posting the job")
        } finally {
            setLoader(false)
        }
    }


    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center text-left">

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
                            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
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
                            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                        </div>
                        <div className="">
                            <Label>Requirement</Label>
                            <Input
                                type="text"
                                name="requirement"
                                value={input.requirement}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                            {errors.requirement && <p className="text-red-500 text-xs">{errors.requirement}</p>}
                        </div>
                        <div className="">
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                            {errors.salary && <p className="text-red-500 text-xs">{errors.salary}</p>}
                        </div>
                        <div className="">
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                        </div>
                        <div className="">
                            <Label>No Of Positions</Label>
                            <Input
                                type="text"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                            {errors.position && <p className="text-red-500 text-xs">{errors.position}</p>}
                        </div>
                        <div className="">
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                            />
                            {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
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
                            {errors.jobType && <p className="text-red-500 text-xs">{errors.jobType}</p>}
                        </div>

                        {
                            companies.length !== 0 && (
                                <Select className="w-full" onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                        {company?.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                        {errors.companyID && <p className="text-red-500 text-xs">{errors.companyID}</p>}
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button className="w-full my-4" type="submit">
                            Post New Job
                        </Button>
                    }
                    {
                        companies.length === 0 && <p className="text-xs font-bold text-red-600 text-center my-3">*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Postjob
