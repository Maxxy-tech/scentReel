import Hero from "./home/Hero";
import Footer from "./home/Footer";
import Poll from "./Poll";
import Forum from "../components/forum/Forum";
// import Showcase from './Showcase'
const Home = () => {
  return (
    <div>
      <Hero />
     <Forum />
      <Poll />
      <Footer />
      {/* <Showcase /> */}
    </div>
  );
};

export default Home;
