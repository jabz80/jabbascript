import { Outlet } from "react-router-dom";
import { Header, Footer, Banner } from "../components";

function index() {
  const footerBg = "#b2dcf2";
  return (
    <>
      <Header />
      <div className="main-block">
      <Banner />
        <Outlet />
      </div>
      <Footer footerBg={footerBg} />
    </>
  );
}

export default index;
