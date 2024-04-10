import React from 'react';

const DownloadFile = ({ hashValue }) => {
    const handleButtonClick = () => {
        // Replace 'hashValue' with the actual hash value generated
        const url = `https://rose-defiant-pheasant-33.mypinata.cloud/ipfs/${hashValue}`;
        // Open the URL in a new tab
        window.open(url, '_blank');
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Download File</button>
        </div>
    );
};

export default DownloadFile;
