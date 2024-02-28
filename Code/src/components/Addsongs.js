import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";
import axios from 'axios';
import { useWriteContract } from 'wagmi';
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress";
import { useAccount } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { parseEther } from 'viem';


const Addsongs = ({ onClose , parameter}) => {
  const [songname , setSongname] = useState("")
  const [songimagefile, setsongimagefile] = useState(null);
  const [imageipfshash , setImageipfshash] = useState("")
  
  const [songfile, setsongfile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [error, setError] = useState('');
  

  const { writeContract } = useWriteContract();
  const account = useAccount();


  
  const uploadToIPFS1 = async () => {
    let songfileUrl;
    
    try {                                        
      if (!songfile) {
        setError('Please select a songfile.');
        return 0;
      }

      const formData = new FormData();
      formData.append('file', songfile);
      
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.JWT}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      
      if (response.status === 200) {
        setIpfsHash(response.data.IpfsHash);
        setError('');
      } else {
        setError(`Error: ${response.data.error || response.statusText}`);
        setIpfsHash('');
      }
       songfileUrl = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while submitting the songfile.');
      setIpfsHash('');
    }
    return songfileUrl;
  };


  const uploadToIPFS2 = async () => {
    let songimagefileUrl;
    
    try {               //If the Artist wants to remain anaonyms then send this
      if (!songimagefile) {
        setError('Please select a songfile.');
        return 0;
      }

      const formData = new FormData();
      formData.append('file', songimagefile);
      
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.JWT}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      
      if (response.status === 200) {
        setImageipfshash(response.data.IpfsHash);
        setError('');
      } else {
        setError(`Error: ${response.data.error || response.statusText}`);
        setImageipfshash('');
      }
       songimagefileUrl = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while submitting the songfile.');
      setImageipfshash('');
    }
    return songimagefileUrl;
  };

  const interact = async (_name) => {

    
    if (!_name) {
      alert("Please fill in all details.");
      return;
    }

    const songIpfsHash = await uploadToIPFS1();
    const songimageIpfsHash = await uploadToIPFS2();
    
    if (songIpfsHash == 0) {
      return(alert("Please upload a song"));
    }
    if (songimageIpfsHash == 0) {
      return(alert("Please upload a song image"));
    }

    return (writeContract({
      abi,
      address: contractAddress,
      functionName: 'addSong',
      args: [
        parameter,
        songIpfsHash,
        _name,
        songimageIpfsHash,
      ],
      account: account.address,
      chainId: sepolia.id,
      value: parseEther('0.05'),
    })
    );

  }





  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    alert("Song Uploaded Successfully!");
  };

  return (
    <>
      <div className="addsongs-form-popup">
        <div className="artist-form">
          <div className="form-close-icon">
            <IoCloseCircle onClick={onClose} className="close-icon" />
          </div>

          <h2>Fill out this form!!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name"> Song Name:</label>
            <input
              type="text"
              id="name"
              value={songname}
              onChange={(e) => setSongname(e.target.value)}
            />
            <br />
            <label htmlFor="song">Upload Song:</label>
            <input
              type="file"
              id="song"
              required={true}
              onChange={(e) => setsongfile(e.target.files[0])}
            />

            <br />
            <label htmlFor="songimagefile">Upload Song Image:</label>
            <input
              type="file"
              id="songimagefile"
              required={true}
              onChange={(e) => setsongimagefile(e.target.files[0])}
            />
            <br />
            <button type="submit" onClick={() => interact(songname)}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addsongs;
