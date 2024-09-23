import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "@/utils/costent";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {

    const {loading,user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      });

      if(res.data.success){
        dispatch(setUser(res.data.data.user))
        dispatch(setToken(res.data.data.token))
        localStorage.setItem("authToken", res.data.data.token);
        console.log(res.data.data.user);
        
        toast.success(res.data.message)
        navigate('/Home')
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      toast.error(error.response.data.message)
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
          <h1 className="font-bold text-xl md-2">Login</h1>
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
            <Label for="password">password</Label>
            <Input
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              autofocus
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-2">
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
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> :<Button className="w-full my-4" type="submit">
            Login
          </Button>
          }
          <span className="text-sm">
            Dont have an account?{" "}
            <Link to="/Signup" className="text-blue-600 text-sm">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
