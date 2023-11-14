import React, { useEffect } from 'react'
import { Fighting } from "../../components";

function index() {
  return (
    <>
      <div className="mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column">
        <h1>Praktice Kombat</h1>
        <button className="btn text-white bg-success btn-lg">Next</button>
      </div>
      <Fighting />
    </>
  );
}

export default index
