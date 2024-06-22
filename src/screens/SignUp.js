import React, { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
  const [credentials,setCredentials] =useState({name:"",branch:"",email:"",contact:"",hostel:"",password:"",confirmPassword:""})
  const [loading,setLoading] =useState(0)
  let navigate=useNavigate();
  const handlesubmit=(event)=>{
    try {
      if(credentials.password!=credentials.confirmPassword){
        alert("conform Password is not matching");return;
      }
      setLoading(1)
      fetch(`${process.env.REACT_APP_BASE_URL}/api/createuser`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,branch:credentials.branch,email:credentials.email,contact:credentials.contact,hostel:credentials.hostel,password:credentials.password})
      }).then(response => response.json()).then(json => {
        if(json.success){
          alert("Your Account is Successfully Created")
          navigate('/login')
        }
        else alert(json.message)
        setLoading(0)
      })
    } catch (error) {
      setLoading(0)
      alert("somthing went wrong try later");
    }
  }
  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

 
  return(
    <div> 
    <div><Navbar /></div>
    <div className="wrapper">
        <div className="logo">
            <img src="https://i.ibb.co/883YwKr/Whats-App-Image-2023-04-04-at-21-30-15.jpg" alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            MNNITIAN
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">Create Your Account</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text"  id="userName" placeholder="Name"  name='name' value={credentials.name} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text"  id="userName" placeholder="Branch"  name='branch' value={credentials.branch} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="contact" id="userName" placeholder="contact" name='contact' value={credentials.contact} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" id="userName" placeholder="HostelName"  name='hostel' value={credentials.hostel} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="ConfirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} />
        </div>
        <button className="btn mt-3 bg-success" onClick={handlesubmit}>Signup</button>
        {loading?<div class="spinner-border" role="status">
          <span class="visually-hidden text-center">Loading...</span>
        </div>:""}  
      </div>
    </div>
  )
}
