import facebook from "../../assets/tabler-icon-brand-facebook.png";
import twitter from "../../assets/tabler-icon-brand-x.png";
import instagram from "../../assets/tabler-icon-brand-instagram.png";
import linkedin from "../../assets/tabler-icon-brand-linkedin.png";
const Footer = () => {
  return (
    <div className="sm:w-[1440px] w-[100vw]   h-[431px] top-[1400px] bg-[#C19E70]">
      <div className="relative h-6  ">
        <div className="bg-[#0a0e0c]   m-8 rounded-lg   sm:w-[1240px] h-[140px] ">
          <div className="flex gap-3 ">
            <div className="flex gap-3 p-4">
              {" "}
              <img src={facebook} alt="" className="mb-2" />
              <img src={instagram} alt="" className="mb-2" />
              <img src={linkedin} alt="" className="mb-2" />
              <img src={twitter} alt="" className="mb-2" />
            </div>

            <h1><span><h1 className="text-white">scent <span>Reel</span></h1></span></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
