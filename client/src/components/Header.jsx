import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setIsLogin } from "../store/actionCreator/meetingCreator";
function Header() {
  const dispatch = useDispatch;
  const { isLogin } = useSelector((state) => state.meetingReducer);
  const logout = () => {
    localStorage.clear();
    dispatch(setIsLogin(false));
  };

  return (
    <nav className="navbar navbar-expand navbar-light flex-column flex-sm-row">
      <div className="container-md">
        <Link className="navbar-brand" to={"/login"}>
          Simple MeetRoom
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {!isLogin ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Sign up
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"} onClick={logout}>
                  Log Out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
