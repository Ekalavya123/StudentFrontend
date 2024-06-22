import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from './ProfileNavbar';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function Experience() {
  let navigate = useNavigate();
  const [Experiencesearch, setExperienceSearch] = useState("");
  const [userSkills, setUserSkills] = useState(null);
  let [experiences, setExperiences] = useState([]);
  let authToken = localStorage.getItem("token");

  const fetchExperience = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/userExperiences/${authToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      let response = await res.json();
      if (response) setExperiences([response]);
    });

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/getUserSkills/${authToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      let response = await res.json();
      if (response) setUserSkills(response);
    });
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <div>
      <div><ProfileNavbar /></div>
      <div className='justify-center ms-2 m-3'>
        <button className='btn btn-success justify-center ms-2 m-3 t-inline' onClick={() => { navigate('/ExperienceUpdate') }}>Click Here to Add Experience or Skills</button>
      </div>
      {userSkills !== null ?
        <div className='container justify-center m-3'>
          <h5>My Skills</h5>
          <ol>
            {userSkills.SkillData && (
              <>
                <p>{userSkills.SkillData.skill1}</p>
                <p>{userSkills.SkillData.skill2}</p>
                <p>{userSkills.SkillData.skill3}</p>
                <p>{userSkills.SkillData.skill4}</p>
                <p>{userSkills.SkillData.skill5}</p>
              </>
            )}
          </ol>
        </div> :
        <div className='container m-3 justify-center'>
          <h5 className='m-3'>My Skills</h5>
          Not Added
        </div>
      }

      <br />
      <h5 className='m-3 justify-content-center' style={{ color: "text-primary" }}>My Experiences</h5>

      <div className="d-flex m-3 justify-content-center">
        <button className="btn btn-outline-success text-white bg-success" style={{ marginRight: '10px' }}>Search</button>
        <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={Experiencesearch} onChange={(e) => { setExperienceSearch(e.target.value) }} />
      </div>

      <div className='container'>
        {
          experiences.length !== 0 && experiences[0] !== null
            ? experiences.map((data) => (
              <div className='row mb-2' key={data.email}>
                {data.experience.length !== 0
                  ? data.experience.filter((item) => item[1].name && String(item[1].name).toLowerCase().includes(String(Experiencesearch).toLowerCase()))
                    .map((userExperience) => (
                      <div key={userExperience._id} className='col-9 col-md-6 col-lg-3 mt-1'>
                        <Card
                          date={userExperience[0].Order_date}
                          email={data.email}
                          message={`${localStorage.getItem("userEmail")} wants to talk with you about your interview experience`}
                          name={userExperience[1].user}
                          company={userExperience[1].name}
                          experience={userExperience[1].experience}
                          profileExp={1}
                        />
                      </div>
                    ))
                  : ""
                }
              </div>
            ))
            : <div>
              <br /><br />
              "You Have Not Shared Any Of Your Experiences"
              <br /><br /><br />
            </div>
        }
      </div>

      <div><Footer /></div>
    </div>
  );
}
