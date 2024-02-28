import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";

const ArtistForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [ImageId, setImageId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Location:", location);
    console.log("Instagram ID:", instagramId);
    console.log("Twitter ID:", twitterId);
    console.log("Image ID:", ImageId);
    onClose(); // Close the form when submitted
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
        <br />
        <label htmlFor="ImageId">Upload Image:</label>
        <input
          type="file"
          id="ImageId"
          value={ImageId}
          onChange={(e) => setImageId(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArtistForm;
