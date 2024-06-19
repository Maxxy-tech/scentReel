import Navbar from "./Navbar.jsx";
import hero from "../../assets/Background.png";

// import Forum from '../forum/Forum'

const Hero = () => {
  return (
    <div
      className=" bg-cover bg-center h-auto"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="h-[100%]  flex flex-col justify-between">
        <div>
          <Navbar />
        </div>
        <div className="bg-[#333333a4] text-white w-full h-full flex flex-col sm:block sm:mt-0 items-center justify-center sm:p-0 p-6">
          <div className="bg-cover bg:backdrop-blur-sm sm:mt-[8%]  mb-10 text-center sm:w-[50%] w-full p-6">
            <div className="flex justify-center ">
              <div className="sm:block">
                <h1 className="capitalize text-[2.8em] text-transparent bg-clip-text bg-gradient-to-r from-[#dfc170] to-[rgb(230,143,13)] font-bold  font-serif">
                  <span className="sm:font-bold text-transparent bg-clip-text bg-gradient-to-t from-transparent to-[#291b02ee]  font-bold  text-[2rem]  sm:p-1 whitespace-nowrap sm:m-6 text-white">
                    &#9627;
                  </span>{" "}
                  Elevate your scent experience
                </h1>
                <p className="font-serif w-full text-[1.1rem] p-8 sm:p-0 sm:mt-6 sm:text-[1.6rem] tracking-wide">
                  Dive into our aromatic realm, where we explore the art and
                  science of fragrances, guiding you through a sensorial journey
                  of scents. Immerse yourself in expert reviews, uncover the
                  latest trends, and embark on a quest to find the perfect
                  perfume that resonates with your unique
                  <span className="text-transparent bg-clip-text bg-gradient-to-t from-transparent to-[#f8dabf] ml-1 h-9 font-bold p-1 text-[2rem] rotate-90">
                    &#9628;
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <-----------------------------------section2 Forum------------------------------------------> */}

      {/* <div className="bg-white p-10 sm:flex ">
        <div className="text-center text-[1.5rem] font-bold uppercase flex">
          <h1>Fragrance of the week</h1>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
