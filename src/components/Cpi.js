import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend} from "chart.js"
import {Line,Doughnut} from "react-chartjs-2"
import ProfileNavbar from './ProfileNavbar' 
import Footer from './Footer'

ChartJS.register(
  CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend
);

export default function Cpi() {
  let navigate=useNavigate();
  let authToken=localStorage.getItem('token')
  const [cpi,setCpi]=useState(null);
  const [spi,setSpi]=useState(null);
  const fetchUserGrades= async () => {
      
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/getGrades/${authToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        let response= await res.json()
        //console.log(response)
        if(response!==null){
          setCpi(response.cpi);
          setSpi(response.spi);
        }
    })
  }
  useEffect(() => {
    fetchUserGrades();
  }, [])

  const labels=[1,2,3,4,5,6,7,8];
  const options={
    responsive:true,
    scales: {
    },
    plugins:{
      legend:{
        position:"bottom",
      },
      title:{
        display:true,text:"Semister Wise SPI CPI Graph",
      },
    },
  };
  
  const data={
    labels,
    datasets:[
      {
        label:"CPI",
        data:cpi,
        borderColor:"rgba(124,252,0,0.4)",
        backgroundColor:'#7CFC00',
      },
      {
        label:"SPI",
        data:spi,
        borderColor:"rgba(0,0,255,0.4)",
        backgroundColor:'#6b46c1',
      },
    ],
  };

  return(
    <div> 
       <div><ProfileNavbar /></div>
       
       {cpi!=null?
       <div>
       <div className='m-3 center' ><Line options={options} data={data}  /></div>
       <div className="container mt-3">
        <h4>Spi,Cpi Table</h4>
        <table className="table table-bordered border-black">
          <thead>
            <tr>
              <th>Semister</th>
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
              <td>{spi[0]}</td>
              <td>{spi[1]}</td>
              <td>{spi[2]}</td>
              <td>{spi[3]}</td>
              <td>{spi[4]}</td>
              <td>{spi[5]}</td>
              <td>{spi[6]}</td>
              <td>{spi[7]}</td>
            </tr>
            <tr>
              <td>CPI</td>
              <td>{cpi[0]}</td>
              <td>{cpi[1]}</td>
              <td>{cpi[2]}</td>
              <td>{cpi[3]}</td>
              <td>{cpi[4]}</td>
              <td>{cpi[5]}</td>
              <td>{cpi[6]}</td>
              <td>{cpi[7]}</td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>:
        <div className='m-3'>
          <br/><br/>
            "Grades Were Not Added"
            <br/>
          <br/><br/>
        </div>}
        <button className={'btn btn-success justify-center ms-2 m-3 t-inline'} onClick={()=>{navigate('/GradesUpdate')}}>Update Grades</button>
       <div><Footer /></div>
    </div>
  )
}
