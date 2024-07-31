import {Outlet} from 'react-router-dom';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer'

const Layout = () => {
  return (

    < >
    <Navbar />
    <Footer />
    <Outlet />
    </>
  )
}

export default Layout