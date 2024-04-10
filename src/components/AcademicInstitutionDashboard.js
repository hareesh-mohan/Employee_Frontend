import React, { useState } from 'react';
import Web3 from 'web3';

import UploadFile from './UploadFile';
import DownloadFile from './DownloadFile';

import {Address} from '../contractinfo/address';
import {ABI} from '../contractinfo/abi';


const AcademicInstitutionDashboard = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState({
        metamask: 'NOT CONNECTED to Metamask',
        contract: 'NOT CONNECTED to Smart Contract'
    });
    // const [verifyResult, setVerifyResult] = useState('');

    //For ipfs
    const [hashValue, setHashValue] = useState(null);
    const [bytes32hashValue,setBytes32HashValue]=useState(null);
    const handleFileUpload = (hashValue,bytes32hashValue) => {
        setHashValue(hashValue);
        setBytes32HashValue(Web3.utils.utf8ToHex(hashValue));
    };
    //----------

    const connectMetamask = async () => {
        if (window.ethereum !== "undefined") {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            setConnectionStatus({ ...connectionStatus, metamask: `Account is: ${accounts[0]}` });
        }
    }

    const connectContract = async () => {
       //ABI AND ADDRESS PROVIDED EXTERNALLY
        window.web3 = await new Web3(window.ethereum);
        const contractInstance = new window.web3.eth.Contract(ABI, Address);
        setContract(contractInstance);
        setConnectionStatus({ ...connectionStatus, contract: "Connection Status: Success" });
    }

    // const verifyDoc = async () => {
    //     const userhash = document.getElementById("verifyuserhash").value;
    //     const dochash = document.getElementById("verifydochash").value;
    //     const is_verified = await contract.methods.verifyDocument(userhash, dochash).call();
    //     setVerifyResult(`Verified: ${is_verified}`);
    // }

    const addDoc = async () => {
        const userhash = document.getElementById("adduserhash").value;
        const dochash = document.getElementById("adddochash").value;
        await contract.methods.addDocument(userhash, dochash).send({ from: account });
    }

    return (
        <div>
            
            <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
            <p id="accountArea">Connection Status: {connectionStatus.metamask}</p>

            <button onClick={connectContract}>CONNECT TO CONTRACT</button>
            <p id="contractArea">Connection Status: {connectionStatus.contract}</p>

            <br /><br />
            {/* ipfs */}
            <h1>Upload and Download File</h1>
            <UploadFile onFileUpload={handleFileUpload} />
            {hashValue && <DownloadFile hashValue={hashValue} />}


            <div className="labels">USER HASH:</div><input type="text" id="adduserhash" /><br />
            <div className="labels">DOCUMENT HASH:</div><input type="text" id="adddochash" value={bytes32hashValue}/><br />
            <button onClick={addDoc}>ADD DOCUMENT</button> <br />

            {/* <br /><br />
            <div className="labels">USER HASH:</div><input type="text" id="verifyuserhash" /><br />
            <div className="labels">DOCUMENT HASH:</div><input type="text" id="verifydochash" /> <br />
            <p id="verifyArea">{verifyResult}</p><br />
            <button onClick={verifyDoc}>VERIFY DOCUMENT</button> <br /> */}
        </div>
    );
}

export default AcademicInstitutionDashboard;
