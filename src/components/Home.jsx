import useGetAllJobs from "@/hooks/useGetAllJobs"
import CategorySection from "./CategorySection"
import Herosection from "./herosection"
import LatestJobs from "./LatestJobs"
import Navbar from "./shared/navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Home = () => {

  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    }
  },[])
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <Herosection />
      <CategorySection />
      <LatestJobs />
    </div>
  )
}

export default Home
