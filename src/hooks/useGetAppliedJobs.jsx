import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLYJOB_API_END_POINT } from "@/utils/costent";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    // Get token from Redux state or fallback to localStorage
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');

    useEffect(() => {
        const fetchAppliedJob = async () => {
            try {
                const res = await axios.get(`${APPLYJOB_API_END_POINT}/get`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Pass token correctly
                    }
                });

                if (res.data.success) {
                    console.log("Applied jobs fetched:", res.data.application);
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log("Error fetching applied jobs:", error);
            }
        };

        fetchAppliedJob();
    }, [dispatch, token]);
}

export default useGetAppliedJobs;