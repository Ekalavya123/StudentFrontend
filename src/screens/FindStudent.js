import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function FindStudent() {
  let [usersSkills, setUsersSkills] = useState([]);
  let [Skills_data, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsersSkills = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/getUsersSkills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      let response = await res.json();
      if (response) setUsersSkills(response);
    });
  };

  const fetchSkills = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/getSkills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      let response = await res.json();
      if (response) setSkills(response);
    });
  };

  useEffect(() => {
    fetchSkills();
    fetchUsersSkills();
  }, []);

  // Ensure Skills_data doesn't exceed 14 elements
  if (Skills_data.length === 14) Skills_data.shift();

  return (
    <div>
      <Navbar />
      <div className="d-flex m-3 justify-content-center">
        <button className="btn btn-outline-success text-white bg-success" style={{ marginRight: '10px' }}>Search</button>
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='container'>
        {
          Skills_data.length !== 0
            ? Skills_data.filter(data => String(data).toLowerCase().includes(String(search).toLowerCase())).map(filterItems => (
              <div className='row mb-3' key={filterItems}>
                <div className="fs-3 m-3">
                  {filterItems}
                </div>
                <hr />
                {usersSkills.length !== 0
                  ? usersSkills.filter(item => item.SkillData && (
                      String(item.SkillData.skill1).toLowerCase() === String(filterItems).toLowerCase() ||
                      String(item.SkillData.skill2).toLowerCase() === String(filterItems).toLowerCase() ||
                      String(item.SkillData.skill3).toLowerCase() === String(filterItems).toLowerCase()
                    )).map(filteredItem => (
                      <div key={filteredItem._id} className='col-9 col-md-6 col-lg-3 mt-1'>
                        <Card
                          email={filteredItem.email}
                          message={`${localStorage.getItem('userEmail')} wants to clear his doubts.`}
                          name='Interests'
                          company={filteredItem.SkillData.user}
                          experience={`${filteredItem.SkillData.skill1}, ${filteredItem.SkillData.skill2}, ${filteredItem.SkillData.skill3}`}
                          profileExp={0}
                        />
                      </div>
                    ))
                  : <div>Fetching...</div>
                }
              </div>
            ))
            : <div>Fetching...</div>
        }
      </div>
      <Footer />
    </div>
  );
}
