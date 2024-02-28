import React, { useState , useContext} from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";
import { useWriteContract } from 'wagmi';
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress";
import { useAccount } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { parseEther } from 'viem';
import { IndexContext } from "../context/indexContext";



const Donate = ({ onClose }) => {
  const { data:hash , writeContract} = useWriteContract();
  const account = useAccount();
  const { selectedIndex} = useContext(IndexContext);

  const [amount, setamount] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hash) {
      alert("Thanks");
    }
    setTimeout(()=>{
      onClose();
      
    },4000)
    
  };

  const donateme = (props) => {

    return (writeContract({
      abi,
      address: contractAddress,
      functionName: 'supportArtist',
      args: [
        selectedIndex,
      ],
      account: account.address,
      chainId: sepolia.id,
      value: parseEther(props),
    }));

  }

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

            <button type="submit" onClick={() => donateme(amount) }>Donate</button>
          </form>
        </div>
      </div>
      {hash && alert("Thanks For Supporting Your Favorite Artist!")}
    </>
  );
};

export default Donate;