import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <div className="row align-items-center">
          <div className="col-0">
            <Link className="navbar-brand" to="/">
              <h3>
                <span className="badge badge-primary ml-3">VID</span>
                <span className="badge badge-danger">HUB</span>
              </h3>
            </Link>
          </div>
          <div className="col">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/movies">
                <h5>Movies</h5>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/customers">
                <h5>Customers</h5>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/rentals">
                <h5>Rentals</h5>
              </NavLink>
              {!user && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/login">
                    <h5>Login</h5>
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/register">
                    <h5>Register</h5>
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/profile">
                    <h5>{`Welcome ${user}`}</h5>
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/logout">
                    <h5>Logout</h5>
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
