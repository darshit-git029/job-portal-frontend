/* eslint-disable no-unused-vars */

import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import store from "@/redux/store";
import Jobs from "./jobs";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const navigate = useNavigate()

  const {alljobs} = useSelector(store=>store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38c2]">Latest & Top</span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {
            alljobs.length <= 0 ? (<span>NA</span>) : (  alljobs.slice(0,6).map((job) => (
              <LatestJobCard key={job._id} job={job}/>
        )))
          
        }
      </div>
    </div>
  );
};

export default LatestJobs;
