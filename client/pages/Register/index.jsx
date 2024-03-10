import React, { useEffect, useState } from "react";
import axios from 'axios'; // axios to post data
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';


export default function Register() {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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
      const response = await axios.post('https://jabbascript-api.onrender.com/register', {
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
    <div className="d-flex justify-content-center align-items-center h-100 register-page">
      <form className="form-fantasy col-md-6 col-lg-4 p-5 shadow" onSubmit={handleSubmit}>
      <h1 className="text-center">Registration</h1>
        <div className="username">
          <label htmlFor="username" className="form-label">Username</label>
          <input id="username" value={formData.username} onChange={handleChange} type="text" className="form-control" placeholder="Enter Username" />
        </div>
        <div className="Email mt-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" value={formData.email} onChange={handleChange} type="email" className="form-control" placeholder="Enter Email" />
        </div>
        <div className="password mt-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input id="password" value={formData.password} onChange={handleChange} type="password" className="form-control" placeholder="Enter Password" />
        </div>
        <div className="password-confirm mt-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="form-control" placeholder="Enter Password again"/>
        </div>
        <div className="mt-4 text-center">
          <a href="/login">
            Already Registered? Click here to Sign In
          </a>
        </div>
        <div className="mt-4 text-center">
          <button type="submit" className="btn btn-fantasy text-white">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

