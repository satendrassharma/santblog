import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Navbar({ authUser, removeAuthUser }) {
  return (
    <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
      <div className="container">
        <div className="topbar-left">
          <button
            className="topbar-toggler"
            style={{ marginTop: "2px", fontSize: "1.5rem" }}
          >
            ☰
          </button>
          <Link className="topbar-brand" to="/">
            <h2 className="logo-default text-dark">SANTBLOG</h2>
            <h2 className="logo-inverse text-white">SANTBLOG</h2>
          </Link>
        </div>
        <div className="topbar-right">
          <ul className="topbar-nav nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            {authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/articles/create">
                  Write new article
                </Link>
              </li>
            )}

            {authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Hey {authUser.user.name}
                  <i className="fa fa-caret-down" />
                </Link>
                <div className="nav-submenu">
                  <Link className="nav-link" to="/user/articles">
                    My articles
                  </Link>
                  <Link className="nav-link" to="/" onClick={removeAuthUser}>
                    Logout
                  </Link>
                </div>
              </li>
            )}

            {!authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  }),
  removeAuthUser: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  authUser: null
};
