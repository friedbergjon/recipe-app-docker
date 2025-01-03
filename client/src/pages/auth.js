import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export const Auth = () =>{
    return (
    <div className="auth">  
    <Login />
    <Register />
    </div>);
};

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await axios.post("http://3.137.63.137:5000/api/auth/login", {
         username,
          password, 
    });

    setCookies("access_token", response.data.token);  
    window.localStorage.setItem("userID", response.data.userID);
    navigate("/");
    } catch (err) {
    alert("Username or password is incorrect");
    }
    };

    return( 
       <div className="auth-container-two">
        <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2 className="auth-title">Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      </div>
    );
  };

  const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://3.137.63.137:5000/api/auth/register", {
          username,
          password,
        });
        alert("Registration Completed! Now login.");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="auth-container-one">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2 className="auth-title" >Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      </div>
    );
  };
