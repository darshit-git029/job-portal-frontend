/* eslint-disable react-hooks/exhaustive-deps */
import { setCompanies } from "@/redux/compnaySlice"
import {  REGISTERCOMPANY_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAllCompanies = () => {
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');
    const dispatch = useDispatch();

    useEffect(() => {
        const fatchAllCompany = async () => {
            try {
                const res = await axios.get(`${REGISTERCOMPANY_API_END_POINT}/get`, {
                    headers: {
                       "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                })
                if (res.data.success) {
                    console.log(res.data.companies)
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fatchAllCompany();
    },[])
}

export default useGetAllCompanies