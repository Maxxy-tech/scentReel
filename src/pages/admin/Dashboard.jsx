import icon from "../../assets/Frame 29.png";
import vector1 from "../../assets/Vector 6.png";
import vector5 from '../../assets/Vector 5.png';
import icon2 from '../../assets/tabler-icon-chevron-down.png'
const Dashboard = () => {
  return (
    <div className="ml-8">
      {/* <div className="ml-[500px] bg-white mt-4 mb-4 h-[52px]  w-[150px] rounded p-2 ">
        <div className="flex gap-4  ml-8 ">
          <h5 className="capitalize mt-2 font-medium ">admin</h5>
          <img src={icon} className="w-[32px] mt-2 mb-2" alt="" />
        </div>
      </div> */}

      <div className="bg-white w-[645px] h-[300px] ">
        <div>
          <div className="flex justify-between m-8 text-[#686666]  capitalize ">
            {" "}
            <h5 className="mt-10">activity feed</h5>
            <h4 className="mt-10">324,987 comments</h4>
            <div className="w-[105px] mt-10 h-[44px] flex bg-[#E5F5F0]"><div className="flex mt-2 ml-6 "><h5> today </h5><img src={icon2} className="w-[24px] h-[24px]" alt="" /></div></div>
          </div>
        </div>
        <div className=" h-full w-full relative">
          <img src={vector5} className="absolute w-[654px] -top-[8px]" alt="" />
          <img src={vector1} className="w-[654px] h-[110px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
