import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../ProfileNavbar';
import Footer from '../Footer';

export default function GradesUpdate() {
    let navigate=useNavigate();
    const spi_data=[null,null,null,null,null,null,null,null];
    const cpi_data=[null,null,null,null,null,null,null,null];
    const handleTable=async ()=>{
    //console.log(cpi_data)
    //console.log(spi_data)
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/addGrades`, {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email:localStorage.getItem("userEmail"),
        cpi:cpi_data,
        spi:spi_data
        })
    }).then(async (res) => {
        let response= await res.json();
        //console.log(response);
        if (response.status) {
        alert("Grades Updated Successfully")
        navigate('/Cpi');
        }
        else{
        alert("Something Went Wrong Please Try Later!")
        }
    })
    }
    return (
      <div>
        <div><ProfileNavbar /></div>
        <div class="container mt-3">
          <h5>Update Your SPI And CPI Here</h5>
          <table class="table table-bordered border-black">
            <thead>
              <tr>
                <th>semister</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SPI</td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[0]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[1]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[2]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[3]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[4]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[5]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[6]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{spi_data[7]=parseFloat(e.target.value)}} /></td>
              </tr>
              <tr>
                <td>CPI</td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[0]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[1]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[2]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[3]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[4]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[5]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[6]=parseFloat(e.target.value)}} /></td>
                <td><input className="form-control " type="search"  aria-label="Search"   onChange={(e)=>{cpi_data[7]=parseFloat(e.target.value)}} /></td>
              </tr>
            </tbody>
          </table>
          <div><button className={'btn btn-success justify-center ms-2 m-3'} onClick={handleTable}>Save</button></div>
          </div>
        <div><Footer /></div>
      </div>  
      
    )
  }
  
