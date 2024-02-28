import React, { useState } from "react";
import "../css/artistform.css";
import { useWriteContract } from 'wagmi';
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress";
import { useAccount } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { parseEther } from 'viem';
import axios from 'axios';



const ArtistForm = ({ onClose }) => {

  const { writeContract } = useWriteContract();
  const account = useAccount();
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [error, setError] = useState('');


  const uploadToIPFS = async () => {
    let fileUrl;

    try {            //If the Artist wants to remain anaonyms then send this
      if (!file) {
        setError('Please select a file.');
        return 0;
      }

      const formData = new FormData();
      formData.append('file', file);

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
      fileUrl = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
     

    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while submitting the file.');
      setIpfsHash('');
    }
    return fileUrl;
  };

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [description, setDescription] = useState("");

  const interact = async (_name, _location, _instagramId, _twitterId, _description) => {


    if (!name || !location || !instagramId || !twitterId || !description) {
      alert("Please fill in all details.");
      return;
    }

    const imageIpfsHash = await uploadToIPFS();
    if (imageIpfsHash == 0) {
      return(alert("Please upload image"));
    }

    return (writeContract({
      abi,
      address: contractAddress,
      functionName: 'registerArtist',
      args: [
        _name,
        account.address,
        _location,
        imageIpfsHash,
        _instagramId,
        _twitterId,
        _description,
      ],
      account: account.address,
      chainId: sepolia.id,
      value: parseEther('0.1'),
    })
    );

  }




  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => onClose(), 4000); // Close the form when submitted
  };

  return (
    <div className="artist-form">
      <div className="close-icon" onClick={onClose}>
        {/* <IoCloseCircle /> */}
      </div>
      <h2>Fill out this form!!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <br />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <label htmlFor="instagramId">Instagram ID:</label>
        <input
          type="text"
          id="instagramId"
          value={instagramId}
          onChange={(e) => setInstagramId(e.target.value)}
        />
        <br />
        <label htmlFor="twitterId">Twitter ID:</label>
        <input
          type="text"
          id="twitterId"
          value={twitterId}
          onChange={(e) => setTwitterId(e.target.value)}
        />
        <label htmlFor="description">Your Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="ImageId">Upload Image:</label>
        <input
          type="file"
          id="ImageId"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <button type="submit" onClick={() => interact(name, location, instagramId, twitterId, description)}>Submit</button>
      </form>
    </div>
  );
};

export default ArtistForm;
