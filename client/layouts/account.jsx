import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

function index() {
  
  return (
    <>
    <div class="d-flex flex-column" style={{'height' : '100dvh'}}>
      <Header />

        <Outlet />

      <Footer />
    </div>
    </>
  );
}

export default index;
