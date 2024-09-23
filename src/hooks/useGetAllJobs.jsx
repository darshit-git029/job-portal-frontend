import { JOB_API_END_POINT } from "@/utils/costent"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAlljob } from "@/redux/jobSlice"; // Ensure this is correctly imported

const useGetAllJobs = () => {
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    const dispatch = useDispatch();
    const { searchquery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyWord=${searchquery}`, { // Ensure parameter matches backend
                    headers: {
                        "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                });
                
                if (res.data.success) {
                    console.log(res.data.data.jobs);
                    dispatch(setAlljob(res.data.data.jobs)); // Update Redux state with jobs
                } else {
                    console.log("No jobs found.");
                    dispatch(setAlljob([])); // Clear jobs if not found
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchquery, token, dispatch]); // Make sure to include all dependencies
};

export default useGetAllJobs;
