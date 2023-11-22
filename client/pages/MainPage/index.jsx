import React, { useEffect } from 'react'
import Read from '../../assets/img/read.png'
import KidCoder from '../../assets/img/computer_boy.png'
import { Link } from 'react-router-dom'

function index() {

  return (
    <>
      <div className="d-flex main-page-marketing-block main-page-marketing-block-bg-1 align-items-center">
        <div className="offset-2 col-4">
          <img src={Read} className="img-fluid" />
        </div>
        <div className="col-4 ms-4">
          <h2 className="main-page-h2">Play and learn</h2>
          <p>Learn to code by fighting monsters and dragons! Follow your code master’s guide in Quest Mode to start your training. Once you have learned the ways of coding, challenge yourself to battle others with your knowledge and fight your way to the top of the leaderboard!</p>
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
              Try Quest{' '}
            </button>
          </Link>
          <Link to="/practice">
            <button
              type="button"
              className="btn btn-fantasy text-white btn-lg"
              data-mdb-ripple-color="#c33232"
            >
              {' '}
              Try Fighting {' '}
            </button>
          </Link>
        </div>
      </div>
      <div className="d-flex main-page-marketing-block main-page-marketing-block-bg-2 align-items-center">
        <div className="offset-2 col-4 me-4">
          <h2 className="main-page-h2">Text-Based Coding</h2>
          <p>Aimed to develop innovative thinking and foster problem-solving skills - Koding Kombat aims to to teach in an engaging and fun manner.
Koding Kombat is currently solely based on teaching Python, stay tuned for future updates and additional language games!</p>
        </div>
        <div className="col-4">
          <img src={KidCoder} className="img-fluid" />
        </div>
      </div>
    </>
  );
}

export default index
