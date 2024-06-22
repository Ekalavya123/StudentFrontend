import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../ProfileNavbar';
import Footer from '../Footer';

export default function ExperienceUpdate() {
    let navigate=useNavigate();
    const authToken=localStorage.getItem('token');
    const [data,setData] =useState({skill1:"",skill2:"",skill3:"",skill4:"",skill5:""})
    const [company_name,setName]=useState("")
    const [experience,setExperience]=useState("")
    let [Skills_data,setSkills]=useState([])
    const [user,setUser]=useState("")
    const fetchUser = async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/getUserDetails`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
              authToken:authToken
          })
      }).then(async (res) => {
          let response= await res.json()
          setUser(response.data.name);
      })}
    
         
    const fetchSkills=async ()=>{
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/getSkills`, {
              // credentials: 'include',
              // Origin:"http://localhost:3000/login",
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(async (res) => {
              let response= await res.json();
              setSkills(response)
          })}
    useEffect(() => {
      fetchSkills();
      fetchUser();
    }, [])
    //console.log(Skills_data[0]);
    const onChange=(event)=>{
      setData({...data,[event.target.name]:event.target.value})
    }
    const handleAdd=async ()=>{
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/AddSkills`, {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Skill_data:{upVotes:0,user:user,skill1:data.skill1,skill2:data.skill2,skill3:data.skill3,skill4:data.skill4,skill5:data.skill5},
            email:localStorage.getItem("userEmail")
          })
        }).then(async (res) => {
          let response= await res.json();
          //console.log(response);
          if (response.status) {
            alert("Skills Successfully Added")
            navigate('/Experience');
          }
          else{
            alert("Something Went Wrong Please Try Later")
          }
      })
        
      }
    const handleExperience=async ()=>{
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/Experience`, {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Experience_data:[{upVotes:0,user:user,name:company_name,experience:experience}],
            name:company_name,
            experience:experience,
            email:localStorage.getItem("userEmail"),
            order_date: new Date().toDateString()
          })
        });
        //console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
          alert("Experience Successfully Added")
          navigate('/Experience');
        }
      }
  
    return (
      <div>
        <div><ProfileNavbar /></div>
          <div className='container mt-3'>
          <h5>Order Your Skill Preferences And Add Here</h5>
          <div className='container w-100 m-3'>
              <div>
              <select className='m-2 h-200   bg-white'  name='skill1'  onChange={onChange}>
                  {Array.from(Array(Skills_data.length),(e,i)=>{
                  return (
                      <option key={i+1} value={Skills_data[i]}>{Skills_data[i]}</option>
                  )
                  })}
              </select>
              </div>
              <div>
              <select className='m-2 h-200   bg-white' name='skill2' value={data.name} onChange={onChange}>
                  {Array.from(Array(Skills_data.length),(e,i)=>{
                  return (
                      <option key={i+1} value={Skills_data[i]}>{Skills_data[i]}</option>
                  )
                  })}
              </select>
              </div>
              <div>
              <select className='m-2 h-200   bg-white' name='skill3' value={data.name} onChange={onChange}>
                  {Array.from(Array(Skills_data.length),(e,i)=>{
                  return (
                      <option key={i+1} value={Skills_data[i]}>{Skills_data[i]}</option>
                  )
                  })}
              </select>
              </div>
              <div>
              <select className='m-2 h-200   bg-white' name='skill4' value={data.name} onChange={onChange}>
                  {Array.from(Array(Skills_data.length),(e,i)=>{
                  return (
                      <option key={i+1} value={Skills_data[i]}>{Skills_data[i]}</option>
                  )
                  })}
              </select>
              </div>
              <div>
              <select className='m-2 h-200   bg-white' name='skill5' value={data.name} onChange={onChange}>
                  {Array.from(Array(Skills_data.length),(e,i)=>{
                  return (
                      <option key={i+1} value={Skills_data[i]}>{Skills_data[i]}</option>
                  )
                  })}
              </select>
              </div>
          </div>
          <div className='d-flex m-3'><button className={'btn btn-success justify-center ms-2 m-3'} onClick={handleAdd} >AddSkills</button></div>
        </div>
        <div className='container mt-3'>
        <h5 className='m-2'>Share Your Interview Experience Here</h5>
         <div className='m-3'>
        <div className="d-flex m-3 justify-content-center ">
          <input className="form-control " type="search" placeholder="Company Name"  aria-label="Search" value={company_name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className="d-flex m-3 justify-content-center ">
          <textarea id="outputtext" className="form-control " type="search" placeholder="Write Your Experience"  aria-label="Search" rows="10" value={experience} onChange={(e)=>{setExperience(e.target.value)}} />
        </div>
        
        <div><button className={'btn btn-success justify-center m-3'} onClick={handleExperience}>Add Experience</button></div>
        </div>
        </div>
       <div><Footer /></div>
      </div>  
      
    )
}
