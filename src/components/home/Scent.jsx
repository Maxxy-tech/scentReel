import React from "react";
import divImg from "../../assets/Things To Keep In Mind While Buying Fragrance For Men 1(3).png";
import vector1 from "../../assets/Vector 1 (3).png";
import img from "../../assets/Things To Keep In Mind While Buying Fragrance For Men 1(2).png";

const Scent = () => {
  return (
    <div className="flex flex-col items-center relative">
      <img
        src={vector1}
        className="w-full h-auto max-w-4xl md:h-[450px]"
        alt="Vector"
      />
      <div className="w-full  flex justify-center -mt-[110%] p-6">
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
          <img
            src={divImg}
            className="absolute top-[10em] left-1/2 transform -translate-x-1/2 bg-[#5db892]  p-[10%] rounded-full w-[10%] md:w-[5%] lg:w-[50%] z-10"
            alt="Gentleman"
          />
          <img
            src={img}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#5db892] p-[15%] rounded-full w-[70%] md:w-[80%] lg:w-[90%] -z-10"
            alt="Gentleman"
          />
        </div>
      </div>
    </div>
  );
};

export default Scent;
