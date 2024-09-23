/* eslint-disable no-unused-vars */
import Navbar from "@/components/shared/navbar"
import ApplicantTable from "./ApplicantTable"
import { useDebugValue, useEffect } from "react"
import axios from "axios"
import { APPLYJOB_API_END_POINT } from "@/utils/costent"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { setAllApplicant } from "@/redux/applicationSlice"


const Applicant = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    const {applicants} = useSelector(store=>store.application)
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLYJOB_API_END_POINT}/${params.id}/applicant`, {
                    headers: {
                        "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                })

                if (res.data.success) {
                    dispatch(setAllApplicant(res.data.job))
                    toast.success(<h1 className="text-md font-bold"> Total Applicant {applicants.application.length}</h1>)
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllApplicants()
    }, [])


    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl font-bold my-5">Applicant {applicants.application.length}</h1>
                <ApplicantTable />
            </div>
        </div>
    )
}

export default Applicant
