import Navbar from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompaniesTable from "./CompaniesTable"
import { useNavigate } from "react-router-dom"
import useGetAllCompanies from "@/hooks/useGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/compnaySlice"

const Companies = () => {
    useGetAllCompanies()
    const navigate = useNavigate()
    const [input , setInput] =  useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
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
                    <Button onClick={() => navigate("/admin/companies/create")}>New Comapany</Button>
                </div>
                <div className="">
                <CompaniesTable/>
                </div>

            </div>
        </div>
    )
}

export default Companies
