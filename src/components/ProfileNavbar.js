import React, { useState } from 'react';
import {useNavigate , Link} from 'react-router-dom';

export default function Navbar() {
  let navigate=useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container-fluid ">
            <div className="nav-item m-3 ">
                <Link className="navbar-brand fs-1 fst-italic mr-5" to="/" >MNNITIAN</Link> 
                <button className=" btn  text-white m-3 btn-lg " onClick={()=>{navigate("/About")}}>ABOUT</button>
                <button className=" btn  text-white m-3 btn-lg " onClick={()=>{navigate("/Experience")}}>EXPERIENCE</button>
                <button className=" btn  text-white m-3 btn-lg" onClick={()=>{navigate("/Cpi")}}>CPI</button>
                <button className=" btn  text-white m-3 btn-lg " onClick={()=>{navigate("/Resources")}}>RESOURCES</button>
            </div>
        </div>
    </nav>
  </div>
  )
}
