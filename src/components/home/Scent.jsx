import React from "react";
import divImg from "../../assets/Things To Keep In Mind While Buying Fragrance For Men 1(3).png";
import vector1 from "../../assets/Vector 1 (3).png";
import img from "../../assets/Things To Keep In Mind While Buying Fragrance For Men 1(2).png";

const Scent = () => {
  return (
    <div className="relative ml-10  m-4 md:m-6 lg:m-8 mt-[2rem] w-[458.57px]">
      <img
        src={vector1}
        className="w-[60%] h-[20rem] md:w-[80%] md:h-[28rem] lg:h-[36rem] max-w-4xl text-[#608A7D]"
        alt="Vector"
      />
      <div className="absolute w-full flex justify-center -mt-[12em] md:-mt-[8em] lg:-mt-[20em] mb-4">
        <div className=" w-full max-w-xs md:max-w-sm lg:max-w-md relative">
          <img
            src={divImg}
            className="absolute top-[4em] left-[7rem] md:left-[11rem] lg:left-[60%] transform -translate-x-1/2 bg-[#F5AFAF] p-2 md:p-3 lg:p-0 rounded-full w-[28%] md:w-[8%] lg:w-[32%] z-10"
            alt="Gentleman"
          />
          <img
            src={img}
            className="relative -top-[32%] left-[15%] sm:left-[18%] md:left-[28%] lg:left-[38%] transform -translate-x-1/2 bg-[#5db892] p-[6%] md:p-[10%] rounded-full w-[68%] md:w-[62%] lg:w-[68%] h-[83%] md:h-[95%] -z-10"
            alt="Gentleman"
          />
        </div>
      </div>
      <div className="w-full mt-10">
        <h4 className="text-[22px] capitalize font-bold w-[323px]">
          david beckham instinct
        </h4>
        <p className="mt-6 w-[300px] ml-4">
          Instinct by David Beckham is a Aromatic Fougere fragrance for men.
          Instinct was launched in 2005. Instinct was created by Beatrice Piquet
          and Alain Astori. Conveying a lively sense of dynamism, this
          captivating masculine fougère citrus perfume is inspired by David's
          authentic and charismatic personality. The vibrant scent opens with a
          flash of zesty freshness thanks to a bright note of bergamot.
        </p>
      </div>
    </div>
  );
};

export default Scent;
