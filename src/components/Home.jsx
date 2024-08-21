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
        <Feeds />
      </div><div className="mt-[80px] w-full "><h2 className="text-[30px] text-center capitalize ">fragrance of the week</h2></div>
      <div className="lg:flex  lg:flex-row gap-6 w-[100vw]  ">

        <Scent />
        <Poll />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
