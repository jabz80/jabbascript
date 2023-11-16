import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

function index() {
  
  return (
  <div className="auth-page">
    <div className="d-flex flex-column flex-grow-1">
      <Header />
      <Outlet />
    </div>
    <Footer />
  </div>
  );
}

export default index;
