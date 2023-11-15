import React, { useEffect, useState } from "react";
import axios from 'axios'; // axios for fetch calls
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; // used for displaying messages




export default function Login() {

  const [showForm, setShowForm] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
      let timer = setTimeout(() => {
        setShowForm(true);
      }, 2010);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jabbascript-api.onrender.com/login', {
        username: loginData.username,
        password: loginData.password,
      });

      localStorage.setItem('token', response.data.token);
      toast.success('Successfully logged in');
      navigate('/account');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || 'Failed to login');
    }
  };

  return (
    
<div className="curtain d-flex align-items-center">
  <div className={`curtain__panel--left curtain__panel animate`} ></div>
  {showForm && (
    <div className="curtain__block d-flex justify-content-center align-items-center">
    <form className="loginForm col-md-6 col-lg-4 bg-light shadow" onSubmit={handleSubmit}>
      <div className="container mx-auto px-5 py-4">
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="text-center">Login</h1>
        </div>
        <hr className="mt-3" />
        <div className="mt-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input id="username" value={loginData.username} onChange={handleChange} type="text" className="form-control" placeholder="Enter Username" />
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input id="password" value={loginData.password} onChange={handleChange} type="password"  className="form-control" placeholder="Enter Password" />
        </div>
        <div className="mt-5 text-center offset-3 col-6">
          <button type="submit" className="btn bg-secondary bg-gradient text-white text-center w-100">Login</button>
        </div>
        <div className="text-center mt-4">
          <a href="/register" className="text-slate-600">Need an account? Register here</a>
        </div>
      </div>
    </form>
  </div>)}
  <div className={` curtain__panel--right curtain__panel animate`} ></div>
</div>


      
  );
}
