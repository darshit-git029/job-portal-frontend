/* eslint-disable react/jsx-key */
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { APPLYJOB_API_END_POINT } from "@/utils/costent"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { toast } from "sonner"


const SortListingStatus = ["Accepted", "Rejected"]


const ApplicantTable = () => {
    const { applicants } = useSelector(store => store.application)
    const token = useSelector(state => state.auth.token) || localStorage.getItem('authToken');

    const statusHandler = async (status,id) => {
        try {
                const res = await axios.post(`${APPLYJOB_API_END_POINT}/status/${id}/update`, {status},{
                    headers: {
                        "Authorization": `Bearer ${token || localStorage.getItem('authToken')}`, // Use token from Redux or localStorage
                    }
                })
                
                console.log(res.data.message);
                if(res.data.success){
                    console.log(res.data);
                    toast.success("status updated successfully")
                }else{
                    console.log("status is not updated");
                    
                }
        } catch (error) {
            console.log(error);  
        }
    }


    
    return (
        <div>
            <Table>
                <TableCaption>
                    List your recent applied user
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.application.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                      item?.applicant?.profile?.resume ? ( <a className="text-blue-500" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>) : <span className="text-red-500">NA</span>
                                    }
                                    </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-35">
                                            {
                                                SortListingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status,item?._id)} className="flex items-center my-3 text-center cursor-pointer" key={index}>
                                                            <span><Badge>{status}</Badge></span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantTable
