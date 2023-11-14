import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

function index() {
  
  return (
    <>
      <Header />

        <Outlet />

      <Footer />
    </>
  );
}

export default index;
