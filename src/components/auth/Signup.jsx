import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/costent.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const {loading,user} = useSelector(store=>store.auth)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileEventHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
      });
      console.log(res);
      
      if (res.data.success) {
        console.log(formData);
        navigate("/login");
        toast.success(res.data.message);
        
    }
} catch (error) {
      console.error("Error occurred:", error.message);
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false))

    }
  };

  useEffect(() =>{
    if(user){
      navigate("/home")
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl md-2">Sign Up</h1>
          <div className="my-2">
            <Label for="name">Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              id="name"
              placeholder="darshit patel"
              autofocus
            ></Input>
          </div>
          <div className="my-2">
            <Label for="email">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              id="email"
              placeholder="darshit@gmail.com"
              autofocus
            ></Input>
          </div>
          <div className="my-2">
            <Label for="phone">PhoneNumber</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              id="phone"
              placeholder="0000000000"
              autofocus
            ></Input>
          </div>
          <div className="my-2">
            <Label for="password">password</Label>
            <Input
              type="password"
              id="password"
              autofocus
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileEventHandler}
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> :<Button className="w-full my-4" type="submit" onChange={submitHandler}>
          Sign Up
          </Button>
          }
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-600 text-sm">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
