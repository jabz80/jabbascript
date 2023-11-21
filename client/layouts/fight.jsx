import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

function index() {
  return (
    <div className="fight-page d-flex flex-column">
      <Header />

      <Outlet />

      {/* <Multiplayer /> */}

      {/* <Footer /> */}
    </div>
  );
}

export default index;
