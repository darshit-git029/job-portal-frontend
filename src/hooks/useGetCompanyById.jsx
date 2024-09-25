/* eslint-disable react-hooks/exhaustive-deps */
import { setSingleCompany } from "@/redux/compnaySlice"
import {  REGISTERCOMPANY_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

const useGetCompanyById = (companyId) => {
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    const dispatch = useDispatch();

    useEffect(() => {
        const fatchSingleCompany = async () => {
            try {
                const res = await axios.get(`${REGISTERCOMPANY_API_END_POINT}/get/${companyId}`, {
                    headers: {
                       "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                })
                if (res.data.success) {
                    console.log(res.data.company)
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch company by id.")

            }
        }
        fatchSingleCompany();
    },[companyId,dispatch])
}

export default useGetCompanyById