import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import Footer from '../components/Footer';

export default function Sent() {
  const [sentRequests, setSentRequests] = useState([]);
  const authToken = localStorage.getItem('token');
  
  const fetchSentRequests = async () => {
    if (!authToken) {
      console.error('No auth token found');
      return;
    }
    try {
      const sentRequestsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/sentRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authToken: authToken})
      });

      const sentRequestsData = await sentRequestsResponse.json();
      console.log(sentRequestsData)
      if (!sentRequestsData.success) {
        console.error('Error fetching sent requests:', sentRequestsData.message);
        return;
      }

      setSentRequests(sentRequestsData.data.requestData);
    } catch (error) {
      console.error('Error fetching sent requests:', error);
    }
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);
  return (
    <div>
      <div><Navbar /></div>
      {sentRequests.length > 0 ? (
        sentRequests.map((data, index) => (
          <div key={index}>
            <RequestCard 
              name={data.RequestedEmail}
              type={data.message}
              accepted={data.accepted}
              isSent={true}
            />
          </div>
        ))
      ) : (
        <div className='m-3 text-lg'>Empty</div>
      )}
      <div><Footer /></div>
    </div>
  );
}
