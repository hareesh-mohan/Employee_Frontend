// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DocumentVerification {
    address public owner;

    struct Document {
        bytes32 hash;
        bool isValid;
    }

    mapping(address => Document[]) public userDocuments;

    event DocumentAdded(address indexed user, bytes32 indexed documentHash);
    event DocumentVerified(address indexed user, bytes32 indexed documentHash, bool isValid);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addDocument(address _user, bytes32 _documentHash) external onlyOwner {
        userDocuments[_user].push(Document({
            hash: _documentHash,
            isValid: true
        }));
        emit DocumentAdded(_user, _documentHash);
    }

    function verifyDocument(address _user, bytes32 _documentHash) external view returns (bool) {
        for (uint256 i = 0; i < userDocuments[_user].length; i++) {
            if (userDocuments[_user][i].hash == _documentHash && userDocuments[_user][i].isValid) {
                return true;
            }
        }
        return false;
    }

    function setDocumentValidity(address _user, bytes32 _documentHash, bool _isValid) external onlyOwner {
        for (uint256 i = 0; i < userDocuments[_user].length; i++) {
            if (userDocuments[_user][i].hash == _documentHash) {
                userDocuments[_user][i].isValid = _isValid;
                emit DocumentVerified(_user, _documentHash, _isValid);
                break;
            }
        }
    }
}
