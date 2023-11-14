import React, { useState } from "react";
import axios from 'axios'; // axios to post data
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; // toastify for notification
import { FaUserAlt } from "react-icons/fa"; 

export default function Register() {
  const [formData, setFormData] = useState({
    email:"",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  };
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success('Successfully registered');
        navigate('/login'); 
      } else {
        toast.error('Failed to register');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to register');
    }
  };
  
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="username container">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Enter Username"
          />
        </div>
        <div className="Email container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Enter Email"
          />
        </div>
        <div className="password container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Enter Password"
          />
        </div>
        <div className="password-confirm container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Enter Password again"
          />
        </div>
        <div>
          <a href="/login" className="text-slate-600">
            Already Registered? Click here to Sign In
          </a>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 duration-300 w-full rounded-md p-2 text-white"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}


