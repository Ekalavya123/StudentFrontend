import React from 'react'
import '../index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function Home() {
  return (

    <div>
        <div><Navbar /></div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain important"}}>
            <div className="carousel-inner" id="carousal" >
                <div className="carousel-item active">
                <img src="https://i.ibb.co/rmGPfbF/mnnit2.jpg" className="d-block w-100" style={{filter: "brightness(60%)"}}/>
                </div>
                <div className="carousel-item">
                <img src="https://i.ibb.co/rmGPfbF/mnnit2.jpg" className="d-block w-100" style={{filter: "brightness(60%)"}}/>
                </div>
                <div className="carousel-item">
                <img src="https://i.ibb.co/rmGPfbF/mnnit2.jpg" className="w-100"  style={{filter: "brightness(60%)"}}/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div><Footer /></div>
    </div>
  )
}


