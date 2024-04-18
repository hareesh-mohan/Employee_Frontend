import React, { useState,useEffect } from 'react';
import Web3 from 'web3';
import {Address} from '../contractinfo/address';
import {ABI} from '../contractinfo/abi';

const CompanyDashboard = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState({
        metamask: 'NOT CONNECTED to Metamask',
        contract: 'NOT CONNECTED to Smart Contract'
    });
    const [verifyResult, setVerifyResult] = useState('');

    useEffect(() => {
        // Function to run after page has loaded
        connectContract();
      }, []); 

    const connectMetamask = async () => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            setConnectionStatus({ ...connectionStatus, metamask: `Account is: ${accounts[0]}` });
        }
    }

    const connectContract = async () => {
       //ABI and address provided externally
        window.web3 = await new Web3(window.ethereum);
        const contractInstance = new window.web3.eth.Contract(ABI, Address);
        setContract(contractInstance);
        setConnectionStatus({ ...connectionStatus, contract: "Connection Status: Success" });
    }

    const verifyDoc = async () => {
        const userhash = document.getElementById("verifyuserhash").value;
        const dochash = document.getElementById("verifydochash").value;
        const is_verified = await contract.methods.verifyDocument(userhash, dochash).call();
        if (is_verified){
            setVerifyResult(`Verification SUCCESSFUL`);
        }else{
            setVerifyResult(`Verification FAILED`);
        }
       
    }

    const addDoc = async () => {
        const userhash = document.getElementById("adduserhash").value;
        const dochash = document.getElementById("adddochash").value;
        await contract.methods.addDocument(userhash, dochash).send({ from: account });
    }

    return (
        <div>


            {/* <button onClick={connectContract}>CONNECT TO CONTRACT</button>
            <p id="contractArea">Connection Status: {connectionStatus.contract}</p> */}

            <br /><br />
            

            <br /><br />
            <div className="labels">USER HASH:</div><input type="text" id="verifyuserhash" /><br />
            <div className="labels">DOCUMENT HASH:</div><input type="text" id="verifydochash" /> <br />
            <p id="verifyArea">{verifyResult}</p><br />
            <button onClick={verifyDoc}>VERIFY DOCUMENT</button> <br />
        </div>
    );
}

export default CompanyDashboard;
