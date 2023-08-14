import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/features/auth/auth.actions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const message = useSelector((state) => state.auth.message);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userdetail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    console.log("Loging in user...");
  };

  useEffect(() => {
    if (authStatus === "succeeded" && message === "Login Successful") {
      navigate("/dashboard");
    }
  }, [message, authStatus, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-700 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
        {authStatus === "succeeded" ? (
          <p className="text-green-500 mb-4">{message}</p>
        ) : (
          <p className="text-red-500 mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userdetail"
              className="block text-gray-800 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="userdetail"
              name="userdetail"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              value={formData.userdetail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300">
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Not registered yet?{" "}
          <Link to="/register" className="text-purple-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
