import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import {
  startScreenLoading,
  stopScreenLoading,
} from "../../features/loadingSlice";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import links from "./links";
import { getFormattedRole } from "../../helpers/formatText";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(auth);
    // eslint-disable-next-line
  }, [auth]);
  const handleLogout = () => {
    dispatch(startScreenLoading());
    dispatch(logout());
    navigate("/login");
    dispatch(stopScreenLoading());
  };
  return (
    <div
      className={
        "Navbar" + (auth.loggedInPerson === null ? "" : " navbar-authed")
      }
    >
      <div className="navbar-brand">
        <h1 className="navbar-brand-title">QIT</h1>
      </div>
      {auth.loggedInPerson !== null && (
        <>
          <nav className="navbar-nav">
            {links.map((link, index) => {
              const role = auth.loggedInPerson.user.role;
              if (link.access.includes(role)) {
                return (
                  <NavLink key={index} to={link.to} className="nav-link">
                    <div className="nav-link-extra">
                      <p className="nav-link-text">{link.text}</p>
                    </div>
                    <p className="nav-link-text">{link.text}</p>
                  </NavLink>
                );
              }
              return null;
            })}
          </nav>
          <div className="navbar-welcome">
            <h4>Welcome {auth.loggedInPerson.name.first}!</h4>
            <span>{getFormattedRole(auth.loggedInPerson.user.role)}</span>
          </div>
          <div className="navbar-functions">
            <button
              className="navbar-function"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
