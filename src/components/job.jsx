/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";


const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgroFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date();
        const timeDiffrence = currentTime - createdAt;
        return Math.floor(timeDiffrence / (1000*24*60*60))
    }



    // const jobId = "newJob"
    return (
        <div className="p-5 rounded-md border border-gray-100 shadow-xl bg-white">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{daysAgroFunction(job?.createdAt) === 0 ? "Today" : `${daysAgroFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark />
                </Button>
            </div>
            <div className="flex gap-2 items-center my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="data:image/jpeg;base64,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" />{" "}
                    </Avatar>
                </Button>
                <div className="">
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-400"> {job?.location}</p>
                </div>
            </div>
            <div className="">
                <h1 className="font-bold text-lg my-2"> {job?.title}</h1>
                <p className="text-sm text-gray-600">
                    {job?.description}
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-red-700 font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-yellow-700 font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className="bg-[#6A38c2]"> Save for Later</Button>
            </div>
        </div>
    );
};

export default Job;
