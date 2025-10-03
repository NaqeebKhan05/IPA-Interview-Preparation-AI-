import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required to enter");
      return;
    }

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      // inside handleLogin after getting response
      if (token) {
        localStorage.setItem("token", token);
        // prefer calling updateUser so context fetches and sets `user`
        await updateUser({ token }); // updateUser expects object with token
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[330px] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your details to login
      </p>

      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="john@example.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
        />
        <Input
          type="password"
          placeholder="Min 8 characters"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button type="submit" className="btn-primary">
          Login
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            className="text-primary font-medium underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
