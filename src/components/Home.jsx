import Hero from "./home/Hero";
import Footer from "./home/Footer";
import Poll from "./Poll";
import Feeds from "../components/home/Feeds";
import Scent from "../components/home/Scent";

const Home = () => {
  return (
    <div className="">
      <Hero />

      <div className="flex  md:flex-row gap-6 h-[500px] ">

          <div className="w-1/2"><Scent /></div>
          <Poll />



      </div>
     <div className="mt-[30%]">
      <Feeds /></div>

      <Footer />
    </div>
  );
};

export default Home;
