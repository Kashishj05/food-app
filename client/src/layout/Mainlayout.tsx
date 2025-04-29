import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      <header>
        <Navbar></Navbar>
      </header>
      {/* <maincontent} */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};
export default Mainlayout;
