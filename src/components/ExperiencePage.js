import React from 'react';
import { useLocation } from 'react-router-dom';
import '../ExperiencePage.css';  // Import the CSS file

export default function ExperiencePage() {
    const location = useLocation();
    
    return (
        <div className='experience-container'>
            <nav className="experience-navbar">
                <form className="form-inline">
                    <h5>{location.state.company}</h5>
                </form>
            </nav>
            <div className='experience-content'>
                <h6>{location.state.date}</h6>
                <h5>{location.state.name}</h5>
                <p>{location.state.experience}</p>
            </div>
        </div>
    );
}
