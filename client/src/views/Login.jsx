import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../store/actionCreator/meetingCreator";
import axios from "../helper/axios";
import Swal from "sweetalert2";
function Login() {
  const { isLogin } = useSelector((state) => state.meetingReducer);
  console.log(isLogin);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [isSubmit, setIsubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    const value = event.target.value;
    console.log(value);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return axios({
      method: "POST",
      url: `login`,
      data: inputs,
    })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("access_token", data.access_token);
        Swal.fire({
          icon: "success",
          title: `Success Login`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      });
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
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
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
