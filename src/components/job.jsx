/* eslint-disable react/prop-types */
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
              
            </div>
            <div className="flex gap-2 items-center my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
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
