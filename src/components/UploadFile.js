import React from 'react';
import axios from 'axios';
const FormData = require('form-data')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NTZmYTg0Yy1hZmRiLTRiZDktYjY0YS1jYmYwY2E4NDE3NWUiLCJlbWFpbCI6Im5pdmVkbmFyYXlhbmFuNjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0ZTA3ZjUzOTNjOGNjOTNmNmJlIiwic2NvcGVkS2V5U2VjcmV0IjoiYmM2ZTJhMjhkOGVhNzU5M2U2NGVjZDU4NzdlYWYzZmQ0ODYzNjcyYWE0ZWEzYjZmNDE5ZDRmYTE4MmJmZDRjNiIsImlhdCI6MTcxMDYxMzE1OH0.AZP__ZpTeWSKgZ_LFZSpUlDx7MJRKbioVRnHVjCtLLc';



const pinFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
        name: file.name,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error pinning file to IPFS');
    }
}



const UploadFile = ({ onFileUpload }) => {
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        try {
            // Upload file to IPFS and get the hash value
            const hashValue = await pinFileToIPFS(file);
            console.log('File pinned to IPFS:', hashValue);
            // Call the parent component's function with the hash value
            onFileUpload(hashValue.IpfsHash);
        } catch (error) {
            console.error('Error pinning file to IPFS:', error.message);
            // Handle error, e.g., display error message
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default UploadFile;
