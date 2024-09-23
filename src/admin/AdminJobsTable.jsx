/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2, Eye, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminJobsTable = () => {
 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job)

    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()
    useEffect(() => {
        const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if(!searchJobByText){
                return true
            }
            return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.title.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredCompany)
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A List Of Your recent posted Job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <>

                                <tr>
                                    <TableCell>
                                        {job?.company?.name}
                                    </TableCell>
                                    <TableCell>
                                        {job?.title}
                                    </TableCell>
                                    <TableCell>
                                        {job?.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/company/${job._id}`)} className="flex items-center gap-2 cursor-pointer w-fit">
                                                    <Edit2 className="w-4"></Edit2>
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicant`)} className="flex items-center gap-2 cursor-pointer w-fit mt-3">
                                                    <Eye className="w-4"></Eye>
                                                    <span>Applicant</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            </>
                        ))
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable