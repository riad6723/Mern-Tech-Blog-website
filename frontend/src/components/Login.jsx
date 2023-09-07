import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

  axios.defaults.withCredentials = true;

  const handleSubmit= e =>{
    e.preventDefault()
        axios.post('http://localhost:5000/login', {email, password})
        .then(res => {
            if(res.data === "Success") {
              localStorage.setItem('loggedinEmail', email);
              window.location.href="/";
            }
        })
        .catch(err => console.log(err))
  }
  return (
    <div className='register'>
    <form onSubmit={handleSubmit}>

    <p>Login</p>

    <div className="email">
    <label htmlFor="email">Email</label>
    <input type="email" name="email" id="email" placeholder='Enter email' value={email} onChange={e=>setEmail(e.target.value)}/>
    </div>
    
    <div className="pass">
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}/>
    </div>

    <div className='registerButton'><button type="submit">Signin</button></div> 
    <div className="registerOptions">
    <span>Don't have an account?</span>
    <span style={{color:"blue"}}> <Link to="/register">Register</Link></span>
    </div>
    
    </form>
    
    </div>
  )
}

export default Login