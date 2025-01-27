import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import "../assets/scss/Global.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, firstName } = useSelector((state) => state.auth);

  return (
    <nav className="main-nav" role="navigation" aria-label="Main Navigation">
      <Link className="main-nav-logo" to="/" aria-label="Argent Bank Home">
        <img src="./img/argentBankLogo.png" alt="Argent Bank Logo" width="200" height="50" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link
              className="main-nav-item user-name"
              to="/user"
              aria-label={`Profile page of ${firstName || "Loading..."}`}
              title={`Welcome, ${firstName || "Loading..."}`}
            >
              <i className="fa fa-user-circle" aria-hidden="true"></i> {firstName || "Loading..."}
            </Link>
            <Link
              className="main-nav-item logout-button"
              onClick={() => dispatch(logout())}
              aria-label="Sign Out"
              title="Sign Out"
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in" aria-label="Sign In" title="Sign In">
            <i className="fa fa-user-circle" aria-hidden="true"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
