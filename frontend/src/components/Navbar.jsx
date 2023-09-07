import React , { useEffect, useState } from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'

function Navbar() {
  
  const [user,setUser]=useState();
  const history=useHistory();

  useEffect( ()=>{
    const loggedinEmail = localStorage.getItem('loggedinEmail');
    if(loggedinEmail)setUser(loggedinEmail);
  },[user]);

  const handleClick = ()=>{
    localStorage.removeItem('loggedinEmail');
    setUser("");
    history.push('/');
  }

  return (
  <div className="top">
    <div className="topLeft">
      <span>Tech Blog</span>
    </div>
    <div className="topCenter">
    <span><Link to="/">Home</Link></span>
      { user? <span><Link to="/Profile">Profile</Link></span> : <></>}
      { user? <span><Link to="/write">Write</Link></span> : <></>}
      <span><Link to="/">Contact</Link></span>
    </div>
    <div className="topRight">
      {
        user? ( <span><button onClick={handleClick}>Logout</button></span> ) : (<> <span><Link to="/register">Register</Link></span> <span><Link to="/login">Login</Link></span> </> )
      }
    </div>
  </div>
  )
}

export default Navbar
