// import React from "react";

import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/costent";
import { setToken, setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {


  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`)
      if (res.data.success) {
        dispatch(setUser(null))
        dispatch(setToken(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto lg:max-w-7xl h-16 md:max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold">
            job<span className="text-[#f83002]">portal</span>
          </h1>
        </div>
        <div className="flex gap-10">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role === "recruiter" ? (<>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )
            }

          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/Signup">
                <Button className="bg-[#6A38c2] hover:bg-[#451599]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col my-2 text-gray-600">
                  {
                    user && user.role === "student" && (<div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"> <Link to='/profile'>View profile</Link></Button>
                    </div>  )
                  }

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={logoutHandler}>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
