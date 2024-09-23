/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchquery } from "@/redux/jobSlice";

const FilterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Ahmedabad", "Banglore", "pune", "mumbai"],
  },
  {
    filterType: "industry",
    array: ["FrontEnd Developer", "BackEnd Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42K to 1Lakh", "1Lakh to 5 Lakh"],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("")
  const dispatch = useDispatch()
  const changeHandler = (value) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchquery(selectedValue))
  }, [selectedValue,dispatch])

  return (
    <div>
      <h1 className="font-bold text-lg">Filter jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {FilterData.map((data, index) => (
          <div className="mt-2">
            <h1> {data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`
              return <div className="flex items-center space-x-2 my-2 mt-3">
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId}>{item}</Label>
              </div>;
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
