import Home from "./components/home/Hero";
import userContext from './context/userContext'
import Showcase from './components/Showcase';
const App = () => {
  return (
    <div className="">
      <userContextProvider>
      <Home />
      <Showcase />

      </userContextProvider>
    </div>
  );
};

export default App;
