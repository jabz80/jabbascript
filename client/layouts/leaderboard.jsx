import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

function index() {
      document.body.classList.add('hidden-overflow');

  return (
    <>
    <div className="d-flex flex-column leaderboard-bg" style={{'height' : '100dvh'}}>
      <Header />
        <Outlet />
    </div>
    </>
  );
}

export default index;
