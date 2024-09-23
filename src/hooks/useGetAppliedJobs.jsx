import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLYJOB_API_END_POINT } from "@/utils/costent";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
                    // Display success toast notification
                    toast.success(res.data.message);

                    // Log fetched applied jobs
                    console.log("Applied jobs fetched:", res.data.application);

                    // Dispatch the action to set all applied jobs in Redux state
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log("Error fetching applied jobs:", error);
            }
        };

        // Invoke the function to fetch applied jobs
        fetchAppliedJob();
    }, [dispatch, token]); // Add dependencies here
}

export default useGetAppliedJobs;