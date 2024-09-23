import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const AppliedJobTable = () => {

    const { allAppliedJobs } = useSelector(store => store.job)
    return (
        <div>
            {
                allAppliedJobs.length <= 0 ? <span className="text-md font-bold text-red-600 ">you dont have apllied any job</span>
                    : <Table>
                        <TableCaption>A List Of Your Applied Job</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Job Role</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                allAppliedJobs.map((appliedJob) => (
                                    <TableRow key={appliedJob?._id}>
                                        <TableCell>{appliedJob?.job?.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell>{appliedJob?.job?.title}</TableCell>
                                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                        <TableCell> <Badge className={`${appliedJob?.status === "rejected" ? "bg-red-500" : appliedJob?.status === "accepted" ? "bg-green-400" : "bg-yellow-300"}`} variant="ghost">
                                            {appliedJob?.status}
                                        </Badge></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
            }
        </div>
    )
}

export default AppliedJobTable
