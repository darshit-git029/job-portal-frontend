import Navbar from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setSingleCompany } from "@/redux/compnaySlice"
import { REGISTERCOMPANY_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const CompanyCreate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName, setComapnyName] = useState()
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');

    const registerNewComapny = async () => {
        try {
            const res = await axios.post(`${REGISTERCOMPANY_API_END_POINT}/register`,{companyName}, {
                headers: {
                    "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    "Content-Type":"application/json"
                },
            })

            if(res.data.success){
                console.log(res.data.company);
                
                dispatch(setSingleCompany(res.data.company))
                const companyId = res.data.company._id
                navigate(`/admin/company/${companyId}`)
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(<p className="text-red-500 text-xs">{"Please insert company name to create company"}</p>)
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto ">
                <div className="my-10">
                    <h1 className="font-bold text-2xl"> Your Company Name</h1>
                    <p className="text-gray-500">What whould you like to give your company name? you can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Job hunt Microsoft etc."
                    onChange={(e) => setComapnyName(e.target.value)}
                />

                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick={() => { navigate("/admin/companies") }}>Cancel</Button>
                    <Button onClick={registerNewComapny}>Continue</Button>

                </div>
            </div>
        </div>
    )
}

export default CompanyCreate

