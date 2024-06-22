
import React from 'react'
import {Link } from 'react-router-dom';


export default function Card(props) {
  let authToken=localStorage.getItem('token');
  const fetchUser = async () => {
    if(localStorage.getItem("token")){
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/getUserDetails`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({authToken:authToken})
    }).then(async (res) => {
      let response= await res.json();    
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/Requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          userEmail:response.data.email,
          RequestedEmail:props.email,
          message:props.message
        })
    }).then(async (res) => {
        let response= await res.json()
        if(response.success) alert("Request Sent");
        else  alert("You Have Allready Sent A Request To This User")
    })
   })
  }
  else alert("Please Login To Your Account First")

  }
  
  const handleRequest=async ()=>{
    fetchUser();
  }
  
  
  return (
    <div>  
        <div className="card" style={{"width": "16rem","maxHeight":"250px" }}>
        <h5 className=" m-2">{props.company}</h5>
        <p className=" m-1">{props.date}</p>
        <div className="card-body">
            <h6 className="">{props.name}</h6>
            <div>
            <p className='d-inline'>{props.experience.substring(0,35)+"..."}</p>
            <Link to="/ExperiencePage/parameter-data" state={{company:props.company,name:props.name,experience:props.experience,date:props.date}}>Read More</Link>
            </div> 
            <hr></hr>
            {!props.profileExp?<button className={'btn btn-success justify-center ms-2'} onClick={handleRequest}>ContactRequest</button>:""}
        </div>
        </div>
    </div>
    
  )
}
