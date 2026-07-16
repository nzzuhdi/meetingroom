import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helper/axios";
import Swal from "sweetalert2";

function Register() {
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
      url: "register",
      data: inputs,
    })
      .then(({ data }) => {
        Swal.fire({ icon: "success", title: "Account created!", timer: 1500, showConfirmButton: false });
        navigate("/login");
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Registration failed";
        Swal.fire({ icon: "error", title: Array.isArray(msg) ? msg[0] : msg, showConfirmButton: true });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </div>
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="forgot-password">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
