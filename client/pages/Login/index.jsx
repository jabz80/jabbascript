import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa"; // login icon
import axios from 'axios'; // axios for fetch calls
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; // used for displaying messages

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/login', {
        username: loginData.username,
        password: loginData.password,
      });

      localStorage.setItem('token', response.data.token); 
      toast.success('Successfully logged in');
      navigate('/account'); 
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.error || 'Failed to login');
    }
  };


  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 max-w-md">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl text-center font-semibold">
              <FaUserAlt className="text-2xl inline mr-2" />
              Login
            </h1>
          </div>
          <hr className="mt-3" />
          <div className="mt-3">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={loginData.username}
              onChange={handleChange}
              type="text"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="Enter Username"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={loginData.password}
              onChange={handleChange}
              type="password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="Enter Password"
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 duration-300 w-full rounded-md p-2 text-white"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <a href="/register" className="text-slate-600">
              Need an account? Register here
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
