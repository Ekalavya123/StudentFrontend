import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestCard(props) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  let authToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!authToken) {
        console.error('No auth token found');
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/getUserDetails", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authToken })
        });

        const data = await response.json();
        if (data.success) {
          setEmail(data.data.email);
        } else {
          console.error('Error fetching user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [authToken]);

  const handleProfile = (email) => {
    localStorage.setItem('requestEmail', email);
    navigate("/RequestAbout");
  };

  const handleEndAccept = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/updateEndRequest", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: email,
          recievedEmail: props.name
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Access Ended");
        window.location.reload();
      } else {
        alert("Something Went Wrong Please Try Again Later");
      }
    } catch (error) {
      console.error('Error ending access:', error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/updateRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: email,
          recievedEmail: props.name
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Request Accepted");
        window.location.reload();
      } else {
        alert("Something Went Wrong Please Try Again Later");
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  return (
    <div className="card mt-2">
      {props.isSent ? (
        <div>
          <h6 className="card-header">{"To: ".concat("", props.name)}</h6>
          <div className="card-body">
            <p className="card-text text-success b-inline">
              Type: <span className='text-secondary'>{props.type}</span>
            </p>
            {props.accepted ? (
              <div>
                <button className=' btn-white b-inline m-2'>accepted</button>
                <button className="btn-success m-2 t-inline" onClick={() => handleProfile(props.name)}>Profile</button>
              </div>
            ) : (
              <div>
                <button className=' btn-white b-inline m-2'>Pending</button>
                <button className="btn-success m-2 t-inline">Unsend</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h6 className="card-header">{"From: ".concat("", props.name)}</h6>
          <div className="card-body">
            <p className="card-text text-success b-inline">
              Type: <span className='text-secondary'>{props.type}</span>
            </p>
            {props.accepted ? (
              <div>
                <button className=' btn-white b-inline m-2'>accepted</button>
                <button className="btn-success m-2 t-inline" onClick={() => handleProfile(props.email)}>Profile</button>
                <button className="btn-success m-2 t-inline" onClick={handleEndAccept}>End Access</button>
              </div>
            ) : (
              <div>
                <button className="btn-success m-2 mr-3 t-inline" onClick={() => handleProfile(props.name)}>Profile</button>
                <button className="btn-success m-2 t-inline" onClick={handleAccept}>Accept</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
