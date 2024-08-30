import React from "react";
import user from "../../assets/tabler-icon-user-circle.png";
import blog from "../../assets/Frame 30.png";
import dashboard from "../../assets/Vector (5).png";
import logout from "../../assets/tabler-icon-logout-2.png";
const Sidebar = () => {
  return (
    <div className="bg-[#fff] p-8  h-[]">
      <div className="w-[201px] top-[80px]   left-[100px] h-[58px]">
        <h1 className="font-[800] uppercase text-[28px] h-[47.6px]">
          <span className="text-black">scent</span>
          <span className="text-[#ca7b13]">reel</span>
        </h1>
      </div>
      <div className="m-8 font-serif tracking-wider">
        <div className="flex m-3 gap-3">
          <div>
            <img src={blog} alt="" />
          </div>
          <h4 className="capitalize active:text-[#0f6b6b] after:text-[#0f644b] cursor-pointer">
            dashboard
          </h4>
        </div>
        <div className="flex m-3 gap-3">
          <div>
            <img src={user} alt="" />
          </div>
          <h4 className="capitalize active:text-[#0f6b6b] after:text-[#0f644b] cursor-pointer ml-3">
            {" "}
            user
          </h4>
        </div>
        <div className="flex m-3 gap-3">
          <div>
            <img src={dashboard} alt="" />
          </div>
          <h4 className="capitalize active:text-[#0f6b6b] after:text-[#0f644b] cursor-pointer ml-3">
            {" "}
            blog
          </h4>
        </div>
      </div>

      <div className="flex mt-[90%] ml-12 gap-4">
        <div>
          <img src={logout} alt="" />
        </div>
        <h5 className="capitalize">logout</h5>
      </div>
    </div>
  );
};

export default Sidebar;
