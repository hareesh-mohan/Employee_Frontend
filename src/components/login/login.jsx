import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const navigate = useNavigate(); // Initialize useNavigate

 
  
  const handleUserClick = () => {
    navigate('/user-login'); // Navigate to the signup page using navigate function
  };
  const handleCompanyClick = () => {
    navigate('/compnay-login'); // Navigate to the signup page using navigate function
  };
  const handleInstiClick = () => {
    navigate('/institution-login'); // Navigate to the signup page using navigate function
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setShowForm(true);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <div className='button'>
      <h1 >Select Login type</h1>
      <a href='/user-login' className='but' >User</a><br></br>
      <a href='/company-login' className='but' >Company</a><br></br>
      <a href='/institution-login' className='but' >Institution</a><br></br>
    </div>
  );
}

export default Login;
