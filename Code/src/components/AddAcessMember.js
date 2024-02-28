import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";
import { useWriteContract } from 'wagmi';
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress";
import { useAccount } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { ethers } from 'ethers';


const AddMember = ({ onClose , parameter}) => {

  const [memaddress , setMemaddress] = useState("")

  const { writeContract } = useWriteContract();
  const account = useAccount();

  const interact = async (addrinString) => {
    
    if (!addrinString) {
      alert("Please fill in all details.");
      return;
    }

    const addr = ethers.getAddress(addrinString);  //Converting String to Address
    
    return (writeContract({
      abi,
      address: contractAddress,
      functionName: 'addAccessMember',
      args: [
        parameter,
        addr,
      ],
      account: account.address,
      chainId: sepolia.id,
    })
    );

  }





  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div className="addsongs-form-popup">
        <div className="artist-form">
          <div className="form-close-icon">
            <IoCloseCircle onClick={onClose} className="close-icon" />
          </div>

          <h2>Fill the Address whom you want to give access for downloading songs</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name"> Address:</label>
            <input
              type="text"
              id="name"
              value={memaddress}
              onChange={(e) => setMemaddress(e.target.value)}
            />
            <br />
            <button type="submit" onClick={() => interact(memaddress)}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMember;
