import facebook from "../../assets/tabler-icon-brand-facebook.png";
import twitter from "../../assets/tabler-icon-brand-x.png";
import instagram from "../../assets/tabler-icon-brand-instagram.png";
import linkedin from "../../assets/tabler-icon-brand-linkedin.png";
const Footer = () => {
  return (
    <div className="sm:w-[100%] mt-[200px]    sm:h-[431px]   h-[431px]  bg-[#C19E70]">
      <div className="relative w-[100%]  ">
        <div className="bg-[#608A7D] box-border absolute -top-[70px] left-5   rounded-lg border-2 border-[#C19E70]   sm:w-[1240px] sm:h-[140px] ">
          <div className="flex gap-[8rem] mt-10 mb-10 pb-1">
            <div className="flex gap-6  ml-12 p-4">
              {" "}

              <div className="w-[24px] h-[24px] bg-[#C19E70] rounded-full"><img src={facebook} alt="" className="mb-2 w-20px h-20px rounded-full " /></div>
              <div className="w-[24px] h-24px bg-[#C19E70] rounded-full"><img src={instagram} alt="" className="mb-2 w-[20px] h-[20px]" /></div>
              <div className="w-[24px] h-[24px] bg-[#C19E70] rounded-full"><img src={linkedin} alt="" className="mb-2 w-[20px] h-[20px]" /></div>
              <div className="w-[24px] h-[24px] bg-[#C19E70] rounded-full"><img src={twitter} alt="" className="mb-2  bg-[#C19E70]" /></div>
            </div>

            <h1><span><h1 className="w-[201px] h-[58px] text-white font-extrabold  text-[48px] flex  uppercase"><span className="text-black font-extrabold">scent</span> <span className="text-[#C19E70]">Reel</span></h1></span></h1>
         <div><button className="bg-[#C19E70] w-[86px] h-[40px] top-[1380px] left-[988px] p-[10px] gap-[10px] uppercase">login</button></div>
         <div><button className="w-[86px] h-[40px] top-[1380px] left-[988px] p-[10px] uppercase gap-[10px] bg-[#608A7D] border ">signup</button></div>
         </div>
        </div>


      </div>
    </div>
  );
};

export default Footer;
