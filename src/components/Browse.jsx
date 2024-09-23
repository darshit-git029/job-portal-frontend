/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useDispatch, useSelector } from "react-redux";
import Job from "./job";
import Navbar from "./shared/navbar";
import { useEffect } from "react";
import { setSearchquery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";


const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch()
  const { alljobs, searchquery } = useSelector(store => store.job)
  useEffect(() => {
    console.log(searchquery);
    return () => {
      dispatch(setSearchquery(""))
    }
  }, [dispatch])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-lg my-10">Search Results for: {searchquery}</h1>
        <h1 className="font-bold text-md my-10">Search Result ({alljobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            alljobs.map((job) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}>
                 < Job key={job._id} job={job}/>
                </motion.div>

              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Browse;
