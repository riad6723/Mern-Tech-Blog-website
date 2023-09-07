import {useParams } from 'react-router-dom'
import './Write.css'
import axios from "axios";
import React, { useEffect, useState } from "react";

function Update() {

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const { id } = useParams();
  const [user,setUser]=useState();

  useEffect(() => {
    
    axios.get('http://localhost:5000/getpostbyid/'+id)
    .then(rslt => {
      setTitle(rslt.data.title);
      setDescription(rslt.data.description);
    })
    .catch(err => console.log(err))

    const loggedinEmail = localStorage.getItem('loggedinEmail');
    if(loggedinEmail)setUser(loggedinEmail);
  }, [id, user])

  const handleSubmit = (e) => {
      e.preventDefault();

      axios.put('http://localhost:5000/editpost/'+id, {title,description})
      .then(res => {
          if(res.data === "Success") {
              window.location.href = "/"
          }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="write">
      <div className="writeTop">
        <h1>Edit Post</h1>
      </div>

      <div className="writeBottom">

        <form onSubmit={handleSubmit}>
          <input type="text" className="writeTitle" value={title} onChange={e => setTitle(e.target.value)}/>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            value={description}
            placeholder=" Write your post...." className="writeArea" onChange={e => setDescription(e.target.value)}
          ></textarea>
          <button className="writePost">Update</button>
        </form>

      </div>

    </div>
  );
}

export default Update;