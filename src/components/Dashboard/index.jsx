import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../../Firebase/ClientApp.mjs'; // Adjust the import based on your Firebase setup
import { NavBar } from '../../components';
// import { updateProfile } from "firebase/auth";
import Sidepanel from "./sidepanel";
import UserProfile from "../UserProfile";
const Dashboard = () => {
  
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div className={`flex w-screen h-screen`}>
      <NavBar />
      <div className="main flex w-full h-full">
        <Sidepanel open={open} setOpen={setOpen} />
        <div className={`container flex flex-col justify-center h-full md:h-full ${open ? "ml-[12%] w-[95%]" : "w-[80%] ml-[18%]"} mr-16 mt-8`}>
          <div className={`Stats grid lg:grid-cols-3 gap-6 ${open ? "w-full ml-4" : "w-full ml-12"} mb-16 mt-20`}>
            <div className="rounded-lg bg-gray-100 h-44 w-full p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Bookmarks
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                <Link to="/bookmarks">12</Link>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 h-44 w-full p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Uploads
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                <Link to="/uploads">45</Link>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 h-44 w-full p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Downloads
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                <Link to="/downloads">20</Link>
              </div>
            </div>
          </div>
          <UserProfile/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
