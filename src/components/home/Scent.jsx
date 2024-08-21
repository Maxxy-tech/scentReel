import React from "react";
import divImg from "../../assets/Things To Keep In Mind While Buying Fragrance For Men 1(3).png";
import vector1 from "../../assets/Vector 1 (3).png";
import img from "../../assets/Things To Keep In Mind While Buying Fragrance For Men 1(2).png";

const Scent = () => {
  return (
    <div className="relative m-4 md:m-8 lg:m-12 mt-[4rem] ">
      <img
        src={vector1}
        className="w-[100%] h-[30rem] lg:h-[40rem] max-w-4xl text-[#608A7D]"
        alt="Vector"
      />
      <div className="w-full flex justify-center -mt-[19em] md:-mt-[10em] lg:-mt-[24.35em] m-10 mb-4">
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md relative">
          <img
            src={divImg}
            className="absolute top-[5em] p-2 left-[12rem] lg:left-[65%] transform -translate-x-1/2 bg-[#F5AFAF] p-[2%] lg:p-0 rounded-full w-[40%] md:w-[10%] lg:w-[35%] z-10"
            alt="Gentleman"
          />
          <img
            src={img}
            className="relative -top-[40%] left-[40%] transform -translate-x-1/2 bg-[#5db892] p-[12%] rounded-full w-[95%] h-[100%] md:w-[70%] lg:w-[80%] -z-10"
            alt="Gentleman"
          />
        </div>
      </div>
    </div>
  );
};

export default Scent;
