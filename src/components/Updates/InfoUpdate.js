import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ProfileNavbar from '../ProfileNavbar';
import Footer from '../Footer';

export default function InfoUpdate() {
    const [credentials,setCredentials] =useState({name:"",branch:"",email:"",contact:"",hostel:""})
    let navigate=useNavigate();
    const handlesubmit=(event)=>{
      event.preventDefault();
      fetch(`${process.env.REACT_APP_BASE_URL}/api/EditUserData`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,branch:credentials.branch,email:credentials.email,contact:credentials.contact,hostel:credentials.hostel})
      }).then(response => response.json()).then(json => {
        if(json.success){
          alert("Details Updated Successfully")
          navigate('/About')
        }
        //console.log(global.email_exist)
        else{
          global.email_exist=false;
          alert("Not a Valid Credentials !!")
        }
        
      })
     
    }
  
    const onChange=(event)=>{
      setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  
   
    return(
      <div> 
      <div><ProfileNavbar /></div>
      <div className="wrapper">
          <div className="logo">
              <img src="https://i.ibb.co/883YwKr/Whats-App-Image-2023-04-04-at-21-30-15.jpg" alt=""/>
          </div>
          <div className="text-center m-4 name text-success">
              MNNITIAN
          </div>
          <div><label htmlFor="exampleInputEmail1" className="form-label md-3">Update Data Here</label></div>
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
          
          <button className="btn mt-3 bg-success" onClick={handlesubmit}>Save</button>
        </div>
        <div><Footer /></div>
      </div>
    )
  }
  
