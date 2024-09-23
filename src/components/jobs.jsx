
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./job";
import Navbar from "./shared/navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jobs = () => {


  const { alljobs, searchquery } = useSelector(store => store.job)
  const [filterJob, setFilterJob] = useState(alljobs)

  useEffect(() => {
    if (searchquery) {
      const filteredJob = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchquery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchquery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchquery.toLowerCase())
        );
      });
      setFilterJob(filteredJob);
    } else {
      setFilterJob(alljobs);
    }
  }, [alljobs, searchquery]);

  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJob.length <= 0 ? (
            <span>Job Not Found!</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJob.map((job) => (
                  <motion.div 
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.5}}
                  key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
