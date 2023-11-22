import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 

import { toast } from 'react-toastify';
import Swal from 'sweetalert2'




export default function Login() {

  const [showForm, setShowForm] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
      let timer = setTimeout(() => {
        setShowForm(true);
      }, 2023);
    
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
    const response = await fetch('https://jabbascript-api.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to login');

      localStorage.setItem('token', response.data.token);
      //toast.success('Successfully logged in');
      Swal.fire({
        title: "Successfully logged in",
        text: "You are now being redirected",
        icon: "success"
      });
      navigate('/account');
      window.location.reload()
    } catch (error) {
      console.log(error);
      //toast.error(error.response?.data?.error || 'Failed to login');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Check you entered the correct details or register an account.'
      })

    }

    const responseData = await response.json();
    localStorage.setItem('token', responseData.token);
    navigate('/account');
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

  return (
    
<div className="curtain d-flex align-items-center login-bg">
  <div className={`curtain__panel--left curtain__panel animate`} ></div>
  {showForm && (
    <div className="curtain__block d-flex justify-content-center align-items-center">
    <form className="loginForm col-md-6 col-lg-4 shadow" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-fantasy text-white text-center w-100">Login</button>
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
