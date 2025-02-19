import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../pages/slider";
import { ethers } from "ethers";

import { IndexContext } from "../context/indexContext";
import { ArtistContext } from "../context/artContext";
import { useAccount } from "wagmi";
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress.js";
import { sepolia } from 'wagmi/chains';


const ArtistCard = ({ artist, pointerOfArray }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedArtist } = useContext(ArtistContext); // Accessing setSelectedArtist from context
  const { setSelectedIndex } = useContext(IndexContext)



  const handleArtistClick = () => {
    setSelectedArtist(artist);
    setSelectedIndex(pointerOfArray) // Setting the selected artist in the context
  };

  return (
    <Link to="/Artist" onClick={handleArtistClick}>
      <div
        className={`max-w-lg  rounded-3xl overflow-hidden shadow-lg bg-transparant transition-transform duration-300 transform hover:scale-105  border-black border-4   ${isHovered ? "shadow-xl" : ""
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ height: "500px" }} // Adjust the height here as needed
      >
        <div>
          <img
            className="h-80 w-80 object-cover rounded-full mx-auto mt-20  border-black border-4"
            src={artist.imageHash}
            alt={artist.name}
          />
        </div>
        <div className="px-6 py-4 bg-black bg-black-50 mt-10">
          <div className="font-bold text-xl  text-white text-center items-center">
            {artist.name}

          </div>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const [artists, setArtists] = useState([]);
  const account = useAccount();

  // const { data } = useReadContract({
  //   abi,
  //   address: contractAddress,
  //   functionName: "getArrArtist",
  //   chainId: sepolia.id,
  //   account: account.address,
  // });

  // useEffect(() => {
  //   console.log("f");
    
  //   if (data) {
  //     console.log("hy");
      
  //     setArtists(data);
  //   }
  // }, [data]);


  const callBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const data = await contract.getArrArtist();

    setArtists(data);
  };

  useEffect(()=>{
    callBlockchainData();
  },[])


  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-5xl font-bold mb-10 text-white items-center text-center ">
          Discover Undiscovered Artists
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {artists.map((artist, index) => {
            return <ArtistCard key={index} artist={artist} pointerOfArray={index} />
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
