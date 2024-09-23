import Navbar from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AdminJobsTable from "./AdminJobsTable"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"
import { setSearchJobsByText } from "@/redux/jobSlice"

const AdminJobs = () => {
    useGetAllAdminJobs()

    const navigate = useNavigate()
    const [input , setInput] =  useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobsByText(input))
    },[input,dispatch])
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input
                     className="w-fit"
                      placeholder="Filter By Name" 
                      onChange={(e) => setInput(e.target.value)}
                      />
                    <Button onClick={() => navigate("/admin/job/create")}>New Job</Button>
                </div>
                <div className="">
                <AdminJobsTable/>
                </div>

            </div>
        </div>
    )
}

export default AdminJobs
