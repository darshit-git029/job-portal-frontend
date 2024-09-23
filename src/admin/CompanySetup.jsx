import Navbar from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useGetCompanyById from "@/hooks/useGetCompanyById"
import { REGISTERCOMPANY_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const CompanySetup = () => {
    
    const params = useParams();
    useGetCompanyById(params.id)

    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const { singleCompany } = useSelector(store => store.company)

    const changeEventHandler = (e) => {
        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`${REGISTERCOMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    "Content-Type": "multipart/form-data"
                },
            })
            if (res.data.success) {
                console.log(res.data.company)
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message
            toast.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 p-8 pl-0">
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl">
                            Company Set-Up
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="">
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="">
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />

                        </div>  <div className="">
                            <Label>Location</Label>
                            <Input
                                type="text"
                                value={input.location}
                                name="location"
                                onChange={changeEventHandler}

                            />
                        </div>  <div className="">
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="">
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button className="w-full my-4" type="submit">
                            Submit
                        </Button>
                    }

                </form>
            </div>
        </div>
    )
}

export default CompanySetup