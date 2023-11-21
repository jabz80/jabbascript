import React, { useEffect } from 'react';
import Read from '../../assets/img/read.png';
import KidCoder from '../../assets/img/computer_boy.png';
import { Link } from 'react-router-dom';
import { Multiplayer } from '../../components';

function index() {
  return (
    <>
      <div className="d-flex main-page-marketing-block main-page-marketing-block-bg-1 align-items-center">
        <div className="offset-2 col-4">
          <img src={Read} className="img-fluid" />
        </div>
        <div className="col-4 ms-4">
          <h2 className="main-page-h2">Play and learn</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam in
          rem inventore, ex temporibus ipsum. Soluta ea corporis quia recusandae
          laborum quos iure, praesentium assumenda consectetur obcaecati
          consequuntur laboriosam. Assumenda?
        </div>
      </div>
      <div className="d-flex bg-main-page-links-block justify-content-center main-page-buttons align-items-center flex-column">
        <h3>Begin to play right now!</h3>
        <div>
          <Link to="/story">
            <button
              type="button"
              className="btn btn-fantasy text-white btn-lg me-4"
              data-mdb-ripple-color="#c33232"
            >
              {' '}
              Try Story Mode{' '}
            </button>
          </Link>
          <Link to="/multiplayer">
            <button
              type="button"
              className="btn btn-fantasy text-white btn-lg"
              data-mdb-ripple-color="#c33232"
            >
              {' '}
              Try Fighting Mode{' '}
            </button>
          </Link>
        </div>
      </div>
      <div className="d-flex main-page-marketing-block main-page-marketing-block-bg-2 align-items-center">
        <div className="offset-2 col-4 me-4">
          <h2 className="main-page-h2">Text-Based Coding</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam in
          rem inventore, ex temporibus ipsum. Soluta ea corporis quia recusandae
          laborum quos iure, praesentium assumenda consectetur obcaecati
          consequuntur laboriosam. Assumenda?
        </div>
        <div className="col-4">
          <img src={KidCoder} className="img-fluid" />
        </div>
      </div>
      <Multiplayer />
    </>
  );
}

export default index;
