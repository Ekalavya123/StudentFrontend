import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import Footer from '../components/Footer';

export default function Received() {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const authToken = localStorage.getItem('token');

  const fetchReceivedRequests = async () => {
    if (!authToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const receivedRequestsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/receivedRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authToken: authToken })
      });

      const receivedRequestsData = await receivedRequestsResponse.json();
      console.log('Received requests data:', receivedRequestsData);

      if (!receivedRequestsData.success) {
        console.error('Error fetching received requests:', receivedRequestsData.message);
        return;
      }

      if(receivedRequestsData.data) setReceivedRequests(receivedRequestsData.data.recievedData);
      
    } catch (error) {
      console.error('Error fetching received requests:', error);
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  return (
    <div>
      <Navbar />
      {receivedRequests.length > 0 ? (
        <div className="row">
          {receivedRequests.map((data, index) => (
            <div  key={index}>
              <RequestCard 
                name={data.recievedEmail}
                type={data.message}
                accepted={data.accepted}
                isSent={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='justify-center m-3'>Empty</div>
      )}
      <Footer />
    </div>
  );
}
