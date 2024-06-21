import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function Navbar() {
  const [request,setRequest] =useState("")
  const navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/")
  }
  const handleProfile=()=>{
    navigate("/About")
  }
  const handleOnclick=()=>{
    navigate("/".concat("",request));
  }
  let options=['Requests','Sent','Recieved'];
  return (
    <div>
      
      <nav className="navbar  navbar-expand-lg navbar-dark bg-success  ">
              {
                !(localStorage.getItem('token'))?
                <div className="container-fluid">  
                <div className="nav-item m-3 ">
                    <Link className="navbar-brand fs-1 fst-italic mr-5" to="/">MNNITIAN</Link>
                    <button className="btn  text-white m-3 btn-lg " onClick={()=>{navigate("/InterviewExperiences")}}>Experiences</button>
                    <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/FindStudent")}}>FindStudent</button>
                    <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/Login")}}>Login</button>
                    <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/SignUp")}}>SignUp</button>
                  </div>
                </div>
                :
                <div className="container-fluid">  
                <div className="nav-item m-3 ">
                  <Link className="navbar-brand fs-1 fst-italic mr-5" to="/">MNNITIAN</Link>
                  <button className="btn  text-white m-3 btn-lg " onClick={()=>{navigate("/InterviewExperiences")}}>Experiences</button>
                  <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/FindStudent")}}>FindStudent</button>
                  <select className='btn-success' onChange={(e)=>{setRequest(e.target.value)} } >
                      {Array.from(Array(3),(e,i)=>{
                      return (
                          <option key={i+1} value={options[i]} >{options[i]}</option>
                      )
                      })}
                  </select>
                  <button className="btn text-white" onClick={handleOnclick}>Get</button>
                  <div className="topRightNavLinks">
                    <button className="btn  text-white  m-3 btn-lg profile-btn"  aria-current="page" onClick={handleProfile}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></button>
                    <button className='btn  text-white m-3 btn-lg logout-btn' onClick={handleLogout}>LogOut</button>
                  </div>
                </div>
                </div>
              }
    </nav>
  </div>
  )
}
