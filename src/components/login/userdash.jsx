import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDash() {
  const [documents, setDocuments] = useState([]);
  const { userEmail } = useParams();
  const handleViewDocuments = async () => {
    // Fetch documents from backend
    try {
      const response = await fetch(`/documents?email=${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required, like authorization token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      setDocuments(data.documents); // Assuming the response contains an array of document hashes
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <button onClick={handleViewDocuments}>View Documents</button>
      <ul>
        {documents.map((document, index) => (
          <li key={index}>{document}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserDash;
