import React, { useState } from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const history=useHistory();

  const handleSubmit= e =>{
    e.preventDefault()
    axios.post('http://localhost:5000/register', {username, email, password})
    .then(res => history.push ('./login'))
    .catch(err => console.log(err))
  }

  return (
    <div className='register'>
    <form onSubmit={handleSubmit}>

    <p>Register</p>

    <div className="username">
      <label htmlFor="username">Username</label>
    <input type="text" name="username" id="username"  placeholder='Enter username' value={username} onChange={e=>setUsername(e.target.value)} />
    </div>

    <div className="email">
    <label htmlFor="email">Email</label>
    <input type="email" name="email" id="email" placeholder='Enter email' value={email} onChange={e=>setEmail(e.target.value)} />
    </div>
    
    <div className="pass">
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}/>
    </div>

    <div className='registerButton'><button type="submit">Signup</button></div> 
    <div className="registerOptions">
    <span>Already have an account?</span>
    <span style={{color:"blue"}}> <Link to="/login">Login</Link></span>
    </div>
    </form>
    </div>
  )
}

export default Register
