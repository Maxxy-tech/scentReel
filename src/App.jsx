import Home from "./components/home/Hero";
import UserContextProvider from './context/userContextProvider'
import Showcase from './components/Showcase';
const App = () => {
  return (
    <div className="">
      <UserContextProvider>
      <Home />
      <Showcase />

      </UserContextProvider>
    </div>
  );
};

export default App;
