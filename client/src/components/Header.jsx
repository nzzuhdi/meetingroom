import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../store/actionCreator/meetingCreator";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.meetingReducer);
  const hasToken = !!localStorage.getItem("access_token");

  const logout = () => {
    localStorage.clear();
    dispatch(setIsLogin(false));
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <Link className="navbar-brand" to="/" style={{ textDecoration: "none", fontWeight: 700, fontSize: "1.25rem", color: "#4361ee" }}>
          MeetRoom
        </Link>
        <div className="nav-links">
          {hasToken ? (
            <>
              <Link className={`nav-link${isActive("/") ? " active" : ""}`} to="/">
                Rooms
              </Link>
              <Link className={`nav-link${isActive("/bookings") ? " active" : ""}`} to="/bookings">
                Bookings
              </Link>
              <button className="btn-logout" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className={`nav-link${isActive("/login") ? " active" : ""}`} to="/login">
                Login
              </Link>
              <Link className={`nav-link${isActive("/register") ? " active" : ""}`} to="/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
