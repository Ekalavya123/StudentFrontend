import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Experiences() {
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState([]);
  console.log(process.env.REACT_APP_BASE_URL)
  const fetchExperience = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/getExperiences`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      let response = await res.json();
      if(response)setExperience(response);
    });
  };

  useEffect(() => {
    fetchExperience();
  }, []);

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
        <div className='row'>
          {
            experience.length !== 0
              ? experience.map((data) => {
                return (
                  data.experience.length !== 0
                    ? data.experience.filter((item) => item[1].name.toLowerCase().includes(search.toLowerCase()))
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id} className='col-md-3 mb-4'>
                            <Card
                              date={filterItems[0].Order_date}
                              email={data.email}
                              message={`${localStorage.getItem("userEmail")} wants to talk with you about your interview experience`}
                              name={filterItems[1].user}
                              company={filterItems[1].name}
                              experience={filterItems[1].experience}
                              profileExp={0}
                            />
                          </div>
                        );
                      })
                    : <div className='col-12'>No Such Data Found</div>
                );
              })
              : <div className='col-12'>Fetching...</div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
