import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";

const Addsongs = ({ onClose }) => {
  const [songname, setsongName] = useState("");
  const [songurl, setsongurl] = useState("");
  const [songimageID, setsongimageID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SongName:", songname);
    console.log("songurl:", songurl);
    console.log("Image ID:", songimageID);
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
              onChange={(e) => setsongName(e.target.value)}
            />
            <br />
            <label htmlFor="songurl">Song :</label>
            <input
              type="text"
              id="songurl"
              value={songurl}
              onChange={(e) => setsongurl(e.target.value)}
            />
            <br />

            <label htmlFor="songimageID">Upload Song Image:</label>
            <input
              type="file"
              id="songimageID"
              value={songimageID}
              onChange={(e) => setsongimageID(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addsongs;
