import React, {useState, useEffect} from 'react'

import { Outlet } from "react-router-dom";
import { Header } from "../components";

function index() {

    document.body.classList.add('hidden-overflow');
    const timeoutId = setTimeout(() => {
      document.body.classList.remove('hidden-overflow');
    }, 1000);

  return (
  <div className={`auth-page`} >
    <div className="d-flex flex-column flex-grow-1">
      <Header />
      <Outlet />
    </div>
  </div>
  );
}

export default index;
