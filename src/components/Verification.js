import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Verification() {
    const [message, setMessage] = useState("");
    const params = useParams();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getUserDetails`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ authToken: params.token })
                });
                
                const response = await res.json();
                if (response.success) {
                    const verificationRes = await fetch(`${process.env.REACT_APP_BASE_URL}/api/verification`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: response.data.email })
                    });
                    
                    const verificationJson = await verificationRes.json();
                    setMessage(verificationJson.message);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                alert("Something went wrong, please try again later");
            }
        };

        verify();
    }, [params.token]);

    return (
        <div className="wrapper">
            <div className="logo">
                <img src={require('../websiteLogo.jpg')} alt="Logo" />
            </div>
            <div className="text-center m-4 name text-success">
                FlowsafeAnalytics
            </div>
            <p className="text-center m-4 text-success">{message}</p>
            {message === "Email verified successfully" ? (
                <Link to="/Login" className="btn mt-3 fs-6 bg-success">Login Here</Link>
            ) : (
                <p className="text-center m-4 text-success">Checking...</p>
            )}
        </div>
    );
}
