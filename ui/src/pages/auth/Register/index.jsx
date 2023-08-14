import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/features/auth/auth.actions";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const message = useSelector((state) => state.auth.message);
  const navigate = useNavigate();

  // console.log(authStatus);
  // console.log(message);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    console.log("registering user...");
  };

  useEffect(() => {
    if (
      authStatus === "succeeded" &&
      message === "User registered successfully."
    ) {
      navigate("/login");
    }
  }, [message, authStatus, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-700 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
        {authStatus === "succeeded" ? (
          <p className="text-green-500 mb-4">{message}</p>
        ) : (
          <p className="text-red-500 mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-800 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-800 font-semibold">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              value={formData.role}
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
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="text-purple-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
