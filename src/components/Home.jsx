import Hero from "./home/Hero";
import Footer from "./home/Footer";
import Poll from "./Poll";
import Feeds from "../components/home/Feeds";
import Scent from "../components/home/Scent";
// import Showcase from './Showcase'
const Home = () => {
  return (
    <div>
      <Hero />

        <Poll />


      <Feeds />

      <Footer />
      {/* <Showcase /> */}
    </div>
  );
};

export default Home;
