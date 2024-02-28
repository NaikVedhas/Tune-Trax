import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";

const Donate = ({ onClose }) => {
  const [amount, setamount] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("amount:", amount);
    onClose();
    alert("Thanks For Supporting Your Favorite Artist!");
  };

  return (
    <>
      <div className="donate-form-popup">
        <div className="artist-form">
          <div className="form-close-icon">
            <IoCloseCircle onClick={onClose} className="close-icon" />
          </div>

          <h2>Support Your Favorite Artist</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="amount"> Enter the Amount in Ether :</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
            />
            <br />

            <button type="submit">Donate</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Donate;
