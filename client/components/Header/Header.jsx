import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { AuthContext } from "../../contexts/Auth";

export default function Header() {
  const { authToken, logout } = useContext(AuthContext) || {};


  const handleLogout = () => {
    logout();
    window.location.href = '/'
  };

  return (
    <header className="bg-body-tertiary z-3 shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand me-auto logo" href="/">
              <img
                src={Logo}
                alt="Logo"
                className="d-inline-block align-text-top me-2"
              />
              Koding Kombat
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
              <div className="navbar-nav ms-auto">
                <NavLink className="ms-5 nav-link" to="/practice">
                  Fighting 
                </NavLink>
                <NavLink className="ms-5 nav-link" to="/story">
                  Quest
                </NavLink>
                <NavLink className="ms-5 nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
                {authToken ? (
                  <>
                    <NavLink className="ms-5 nav-link" to="/account">
                      Account
                    </NavLink>
                    <a
                    className="ms-5 nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                  </>
                ):(
                  <>
                <NavLink className="ms-5 nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="ms-5 nav-link" to="/register">
                  Register
                </NavLink>

                </>)}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
