import { setAllAdminJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAllAdminJobs = () => {
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    const dispatch = useDispatch();

    useEffect(() => {
        const fatchAllAdminJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobadmin`, {
                    headers: {
                       "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                })
                if (res.data.success) {
                    console.log(res.data.jobs)
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fatchAllAdminJob();
    },[])
}

export default useGetAllAdminJobs