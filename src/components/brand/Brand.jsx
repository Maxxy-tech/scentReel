import Socials from '../Socials'
import Navbar from "../home/Navbar";

import divImg from "../../assets/Lady2.jpeg";
import vector1 from "../../assets/Vector 1 (3).png";
import Footer from "../../components/home/Footer";
const Brand = () => {
  return (
    <div>
      <div className="bg-[#608A7D] box-content  sm:w-auto h-[100%]">
        <Navbar />

        <div className="md:flex sm:p-1 sm:relative sm:m-[60px] sm:justify-between">
          <div className="sm:flex w-1/3">
            <div className="sm:flex  rounded-full sm:relative sm:w-[600px] sm:h-[350px] hidden sm:mt-[10px]">
              <img
                src={vector1}
                className="ml-[15%] w-[500px] h-[450px]"
                alt=""
              />
              <img
                src={divImg}
                className="absolute p-4 sm:h-[500px] sm:w-[370px]  ml-[27%] mt-[1px] bg-transparent rounded-full"
                alt=""
              />
            </div>
          </div>

          <div className="bg-white box-content text-center sm:w-2/3 w-[100vw] sm:top-[380px] top-[190px]  sm:h-[434px]  border-[1px] border-[#608A7D] rounded-[20px]">
            <div className="w-[100vw] sm:h-full pr-4 mr-4">
              <div>
                <h1 className="text-center sm:mr-[32rem] p-4 uppercase font-bold font-serif mt-6 text-[2rem]">
                  brand

                </h1>

                  <div className="ml-[20%]"><Socials />{" "}</div>


              </div>
              {/* Google registration section */}
              <section className="ml-10"></section>
            </div>
          </div>
        </div>
        <div className="mt-[6rem]">
          <Footer />
        </div>
      </div>
    </div>
  );
};




export default Brand