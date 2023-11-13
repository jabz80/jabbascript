import { Outlet } from "react-router-dom";
import { Header, Footer, Banner } from "../components";

function index() {
  
  return (
    <>
      <Header />
      <div className="main-block">
      <Banner />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default index;
