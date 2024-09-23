import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const CompaniesTable = () => {
 
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate = useNavigate()
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A List Of Your Applied Job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <>

                                <tr>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company?.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {company?.name}
                                    </TableCell>
                                    <TableCell>
                                        {company?.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/company/${company._id}`)} className="flex items-center gap-2 cursor-pointer w-fit">
                                                    <Edit2 className="w-4"></Edit2>
                                                    <span>Edit</span>
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

export default CompaniesTable