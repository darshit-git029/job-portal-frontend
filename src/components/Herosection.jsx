import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchquery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Herosection = () => {

  const [query, setQuery] = useState("");
  const dispatch =  useDispatch();
  const navigate = useNavigate()
  const searchJobHandler = () => {
    dispatch(setSearchquery(query))
    navigate("/browse")
  }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10 ">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-[#f83002]">
          No.1 Job Hunt website
        </span>
        <h1 className="text-5xl font-bold">
          Search,Apply & <br /> Get Your
          <span className="text-[#6838c2]">Dream job</span>
        </h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae libero
          ullam quaerat asperiores magnam rerum aut dicta amet.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Fide your Dream jobs"
            className="outline-none border-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6838c2]">
            <Search className="h-5 w-5"></Search>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
