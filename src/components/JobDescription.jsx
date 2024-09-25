/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { APPLYJOB_API_END_POINT, JOB_API_END_POINT } from "@/utils/costent"
import { useDispatch, useSelector } from "react-redux"
import store from "@/redux/store"
import { setSingleJob } from "@/redux/jobSlice"
import { toast } from "sonner"
import Navbar from "./shared/navbar"

const JobDescription = () => {
    const { singlejob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singlejob?.application?.some(application => application.applicant === user?._id) || false    
    const [isAplly,setIsApply] = useState(isInitiallyApplied)


    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');

    const applyjobApplication = async () => {
        try {
            if(user){
            const res = await axios.get(`${APPLYJOB_API_END_POINT}/apply/${jobId}`, {
                headers: {
                    "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                }
            })
            if (res.data.success) {
                console.log(res.data.message);
                setIsApply(true)    
                const updateSingleJob = {...singlejob, application:[...singlejob.application,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob)) 
                toast.success(res.data.message)
            }}
            else(toast.error("Please Login to Apply for this job")
            )
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    useEffect(() => {
        const fatchsinglejob = async () => {

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getById/${jobId}`, {
                    headers: {
                        "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                })
                if (res.data.success) {
                    console.log(res.data.job)
                    dispatch(setSingleJob(res.data.job))
                    setIsApply(res.data.job.application.some(application=>application.applicant=== user?._id))
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to apply for the job. Please try again later.")
            }
        }
        fatchsinglejob();
    }, [jobId, dispatch, user?._id])

    return (
        
        <div className="max-w-7xl mx-auto my-0">
            <Navbar/>
            <div className="flex items-center justify-between mt-5 border-t border-gray-300 pt-4">
                <div>
                    <h1 className="font-bold text-xl">{singlejob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {singlejob?.position} Positions
                        </Badge>
                        <Badge className="text-red-700 font-bold" variant="ghost">
                            {singlejob?.jobType}
                        </Badge>
                        <Badge className="text-yellow-700 font-bold" variant="ghost">
                            {singlejob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isAplly ? null : applyjobApplication} 
                    disabled={isAplly}
                    className={`rounded-lg ${isAplly ? 'bg-gray-600 cursor-not-allowed hover:bg-gray-600' : 'bg-[#6A38c2] hover:bg-[#482782]'}`}
                >
                    {isAplly ? <span>Apply Already</span> : <span>Apply Now</span>}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-bold text-lg py-4">Job Description</h1>
            <div className="my-4">
                <h1 className="my-2 font-bold">Role: <span className="pl-4 font-normal text-gray-800">{singlejob?.title}</span></h1>
                <h1 className="my-2 font-bold">Location: <span className="pl-4 font-normal text-gray-800">{singlejob?.location}</span></h1>
                <h1 className="my-2 font-bold">Description: <span className="pl-4 font-normal text-gray-800">{singlejob?.description}</span></h1>
                <h1 className="my-2 font-bold">Experience: <span className="pl-4 font-normal text-gray-800">{singlejob?.experienceLevel} years</span></h1>
                <h1 className="my-2 font-bold">Salary: <span className="pl-4 font-normal text-gray-800">{singlejob?.salary} LPA</span></h1>
                <h1 className="my-2 font-bold">Total Applicant: <span className="pl-4 font-normal text-gray-800">{singlejob?.application?.length}</span></h1>
                <h1 className="my-2 font-bold">Posted Date: <span className="pl-4 font-normal text-gray-800">{singlejob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription