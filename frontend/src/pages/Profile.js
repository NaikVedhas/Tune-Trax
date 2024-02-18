import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import '../css/profile.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserProfile = ({ parameter }) => {
  return (
    <>
      <div className="user-info-container">
        
          <img
            className="user-img "
            src={parameter.userimage}
            alt="userimage"
          />
       
        <p className="user-name ">{parameter.username}</p>
        <button className="donate-btn">COLLECT FUND</button>
      </div>
    </>
  );
};

const Profile = ({onClose}) => {
  const userProfileData = [
    /*backend array*/
    {
      userimage:
        "https://tse4.mm.bing.net/th?id=OIP.WpnGIPj1DKAGo-CP64znTwHaHa&pid=Api&P=0&h=1800",
      username: "Aastha",
    },
    {
      userimage:
        "https://tse2.mm.bing.net/th?id=OIP.0ufZVBFzwkW8fV1ovsrxMgHaF3&pid=Api&P=0&h=1800",
      username: "Aadya",
    },
    {
      userimage:
        "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg",
      username: "Aarsh",
    },
  ];

  const SongsData = [
    { songs: "Song 1" },
    { songs: "Song 2" },
    { songs: "Song 3" },
    { songs: "Song 4" },
    { songs: "Song 5" },
    { songs: "Song 6" },
    { songs: "Song 7" },
    { songs: "Song 8" },
    { songs: "Song 9" },
    { songs: "Song 10" },
  ];

  const [index, setIndex] = useState(3);

  const handleClick = () => {
    if (index < SongsData.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-wrapper" onClick={onClose}></div>
      <div className="profile-container bg-#14161b grid grid-cols-2">
        <UserProfile parameter={userProfileData[0]} />
        <div className="songs-container grid col-span-1 bg-aliceblue overflow-auto h-96 justify-center items-center flex-wrap gap-8 flex-col">
          <div className="add-event-btn-div flex items-center justify-center w-full h-12">
            <CiCirclePlus
              className="add-event-btn h-10 w-10 text-white mt-2 cursor-pointer"
              onClick={handleClick}
            />
          </div>
          {SongsData.slice(0, index + 1).map((item, idx) => (
            <div
              key={idx}
              className="songs-div bg-yellow-300 text-white self-center text-center h-10 w-80 rounded-md"
            >
              {item.songs}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;