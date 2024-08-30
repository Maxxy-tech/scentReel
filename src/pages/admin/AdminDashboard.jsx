import React from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import User from "./User";
import icon from "../../assets/Frame 29.png";

const AdminDashboard = () => {
  return (
    <div className="flex w-[100vw] ">
      <div className="flex bg-[#f1e9e96c]  h-full">
        {" "}
        <div className="flex  ">
          <Sidebar />
          <div className="relative mt-20 mr-20 w-full">
            {/* <Dashboard /> */}
            <User />
          </div>
        </div>
        <div className=" bg-white absolute mt-4 mb-4 h-[52px]  w-[150px] rounded p-2 left-[75%] ">
          <div className="flex gap-4  ml-8 ">
            <h5 className="capitalize mt-2 font-medium ">admin</h5>
            <img src={icon} className="w-[32px] mt-2 mb-2" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
