import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import ArtistForm from './formartist';
import '../css/navbar.css';
import { NavLink } from "react-router-dom";

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

  return (
    <>
      <nav className="nav-container">
        <div className="website-name">Website Name</div>
        <div className="other">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/aboutus">About us</a>
            </li>
            <li>
              <button onClick={openArtistForm}>Become Artist</button>
            </li>
          
            <li>
            <NavLink to="/Profile">Profile</NavLink>
            </li>
            <li>Connect Wallet</li>
          </ul>
        </div>
      </nav>
      {isArtistFormOpen && (
  <div className="artist-form-popup">
    <div className="close-icon" onClick={closeArtistForm}>
      <IoCloseCircle />
    </div>
    <ArtistForm onClose={closeArtistForm} />
  </div>
)}
    </>
  );
};

export default Navbar;
