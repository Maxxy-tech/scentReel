import Hero from "./home/Hero";
import Footer from "./home/Footer";
import Poll from "./Poll";
import Feeds from "../components/home/Feeds";
import Scent from "../components/home/Scent";

const Home = () => {
  return (
    <div className="">
      <Hero />

      <div className="mt-[0.3%]">
        <h1 className="font-sans text-center w-full mb-10 font-extrabold text-[1.2rem] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f0cd0b] to-black">
          Forum
        </h1>
        <Feeds />
      </div>
      <div className="mt-[80px] w-full ">
        <h2 className="text-[30px] text-center capitalize ">
          fragrance of the week
        </h2>
      </div>
      <div className="lg:flex  lg:flex-row gap-6]  ">
        <Scent />

        <Poll />
      </div>
      <div className="mt-[100%]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
