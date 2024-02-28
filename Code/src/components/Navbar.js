import React, { useState } from 'react';
import { IoCloseCircle, IoLogIn } from 'react-icons/io5';
import ArtistForm from './formartist';
import '../css/navbar.css';
import { NavLink } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress.js";
import { sepolia } from 'wagmi/chains';


const Navbar = () => {
  const [isArtistFormOpen, setIsArtistFormOpen] = useState(false);

  const openArtistForm = () => {
    if (!isArtistFormOpen) {
      setIsArtistFormOpen(true);
    }
  };

  const closeArtistForm = () => {
    setIsArtistFormOpen(false);
  };


  const account = useAccount();
  const { data } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getArrArtist",
    chainId: sepolia.id,
    account: account.address,
  });

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
          <img src="../logo.png" alt='TuneTrax' className='website-name' />
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
