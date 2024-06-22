import React,{useEffect, useState} from 'react'
import Footer from '../components/Footer'
import ProfileNavbar from '../components/ProfileNavbar'
import { Link } from 'react-router-dom'

export default  function About() {
    let [data,setData]=useState(["","","","",""])
    let authToken=localStorage.getItem("token")
    try {
        const fetchUser = async () => {
            await fetch(`${process.env.REACT_APP_BASE_URL}/api/getUserDetails`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({authToken:authToken})
            }).then(async (res) => {
                
                let response= await res.json();
                console.log("data",response.data);
                if(response.success) setData([response.data.name,response.data.email,response.data.branch,response.data.contact,response.data.hostel])
                else alert(response.message)
            })
        }
        useEffect(() => {
            fetchUser()
        }, [])
        
    } catch (error) {
        alert("smothing went wront")
    }
    
    return (
      <div>
      <div><ProfileNavbar /></div>
      <div className="wrapper ">
          <div className="logo ">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""/>
          </div>
          <div className='d-flex mt-3'>
            <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Name :</label></div>
            <div className="form-label m-1 mt-4">{data[0]}</div>
          </div>
          <div className='d-flex'>
            <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Email:</label></div>
            <div className="form-label mt-4">{data[1]}</div>
          </div>
          <div className='d-flex'>
            <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">branch : </label></div>
            <div className="form-label m-1 mt-4">{data[2]}</div>
          </div>
          <div className='d-flex'>
            <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Contact:</label></div>
            <div className="form-label mt-4">{data[3]}</div>
          </div>
          <div className='d-flex'>
            <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">hostel : </label></div>
            <div className="form-label m-1 mt-4">{data[4]}</div>
          </div>
          <br/>
          {/* {email==localStorage.getItem("userEmail")?<Link to="/InfoUpdate" className="btn mt-3 fs-6 bg-success">Edit</Link>:""} */}
      </div>
      <div><Footer /></div>
      </div>
      
  )
    
}


