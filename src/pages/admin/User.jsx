import React from "react";
import icon2 from "../../assets/tabler-icon-chevron-down.png";
import frame from '../../assets/Frame 30 (1).png'
import vector6 from '../../assets/Vector (6).png'
const User = () => {
  return (
    <div className="text-[#757373] w-[100vw]">
      <div className="bg-white w-[765px] ml-8 h-[56px]">
        <div className="flex justify-around ">
          <h5 className="mt-4 ">Registered Users</h5>
          <h5 className="mt-4">Pending Users</h5>
          <h5 className="mt-4">Banned Users</h5>
        </div>
      </div>
      <div className="flex">
        <div className="w-[372px]  pb-20 bg-white  ml-4 mt-6">
          <div className="h-full w-full flex gap-10">
            <h4 className="capitalize  pt-4 pl-4">total registered users</h4>
            <div className="mt-4 w-[100px] h-[40px] captalize flex bg-[#E5F5F0]">
              <div className="flex mt-2 ml-6 capitalize">
                <h5> today </h5>
                <img src={icon2} className="w-[24px] h-[24px]" alt="" />
              </div>
            </div>
          </div>
          <div className="flex -top-10">
            <img
              src={vector6}
              className="bg-[#96f1ea44] ml-20   w-[32px] h-[32px] p-2 rounded-full"
              alt=""
            />
            <h5 className="ml-3 font-bold text-[#131111c2] tracking-wider">
              5,658
            </h5>
          </div>{" "}
        </div>

        <div className="mt-10 flex gap-1 ml-2 ">
          <div>
            <img src={frame} className="mt-10 w-[20px]" alt="" />
          </div>
          <h4 className="mt-10 lowercase tracking-wide font-thin w-">filter</h4>

          <div className="ml-2">
            <h5 className="capitalize mb-2 ml-6">date</h5>
            <input
              type="date"
              name="date"
              id="date"
              className="h-7 border-[#fff] rounded-sm"
            />
          </div>

          <div className="ml-1">
            <h5 className="capitalize mb-2 ml-6">name</h5>
            <input
              type="text"
              className="h-7 w-[190px] border-[#fff] rounded-sm"
              name=""
              id=""
            />
          </div>
        </div>
      </div>

      <div className="bg-white mt-8 flex justify-around capitalize text-[#181616]"><h5>date</h5>
      <h5>name</h5>
      <h5>status</h5>
      <h5>Email</h5></div>
    </div>
  );
};

export default User;
