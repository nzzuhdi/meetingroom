import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../store/actionCreator/meetingCreator";
import axios from "../helper/axios";
import Swal from "sweetalert2";

function Login() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: "login",
      data: inputs,
    })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        dispatch(setIsLogin(true));
        Swal.fire({ icon: "success", title: "Welcome back!", timer: 1500, showConfirmButton: false });
        navigate("/");
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Login failed";
        Swal.fire({ icon: "error", title: msg, showConfirmButton: true });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="forgot-password">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
