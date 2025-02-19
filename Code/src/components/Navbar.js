import React, { useState,useEffect } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import ArtistForm from './formartist';
import '../css/navbar.css';
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { ethers } from "ethers";

import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress.js";
import { sepolia } from 'wagmi/chains';


const Navbar = () => {
  const [isArtistFormOpen, setIsArtistFormOpen] = useState(false);
  const [data,setData] = useState();
  const openArtistForm = () => {
    if (!isArtistFormOpen) {
      setIsArtistFormOpen(true);
    }
  };

  const closeArtistForm = () => {
    setIsArtistFormOpen(false);
  };


  

  const account = useAccount();
  const callBlockchainData = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    try {
      const data = await contract.getArrArtist();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    callBlockchainData();
  },[])

  




  let check = false;
  if (data) {

    for (let i = 0; i < data.length; i++) {

      if (account.address === data[i].artistAddress) {
        check = true;
      }

    }

  }


  return (
    <>
      <nav>
        <div className="nav-container">
          <div  className='website-name'>
          <img src="../website-logo.png" alt='logo'/>
          <img src="../website-name.png" alt='TuneTrax' />
          </div>
          <div className="other">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/aboutus">About us</a>
              </li>

              <li>
                {check && <a href="/Profile">Profile</a>}
                {!check && <button disabled={true} style={{ opacity: 0.5 }}>Profile</button>}

              </li>

              <li><ConnectKitButton /></li>

              <li>
                {account.address ? (

                  check ? (<button className="donate-btn" style={{ opacity: 0.5 }} disabled={true}>
                    Become Artist
                  </button>) : (<button className="donate-btn" onClick={openArtistForm}>
                    Become Artist
                  </button>)


                ) : (<button className="donate-btn" style={{ opacity: 0.5 }} disabled={true}>
                  Become Artist
                </button>)}
              </li>

            </ul>
          </div>
        </div>
        {isArtistFormOpen && (
          <div className="artist-form-popup">
            <div className="close-icon" onClick={closeArtistForm}>
              <IoCloseCircle />
            </div>
            <ArtistForm onClose={closeArtistForm} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
