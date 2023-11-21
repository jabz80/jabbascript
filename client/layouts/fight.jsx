import { Outlet } from 'react-router-dom';
import { Header,  } from '../components';

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
