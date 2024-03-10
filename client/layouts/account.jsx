import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

function index() {
  
  return (
    <>
    <div className="d-flex flex-column account-bg" style={{'height' : '100dvh'}}>
      <Header />
        <Outlet />
    </div>
    </>
  );
}

export default index;
