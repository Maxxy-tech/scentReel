import Home from "./components/home/Hero";
import {UserContextProvider} from './context/userContextProvider'
import {AuthProvider} from './context/Authprovider'
import Showcase from './components/Showcase';
const App = () => {
  return (
    <div className="">
      <AuthProvider>
      <UserContextProvider>
      <Home />


      </UserContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
