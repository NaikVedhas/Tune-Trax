import React, { useState, useContext } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArtistContext } from "../context/artContext";

const UserProfile = ({ artist }) => {
  return (
    <div className="user-info-container grid justify-center items-center">
      <img
          className="h-64 w-64 object-cover rounded-full mx-auto"
          src={artist.image}
          alt={artist.name}
        />
        <div className="px-6 py-4 bg-black bg-opacity-50">
          <div className="font-bold text-xl mb-2 text-white">
            {artist.name}
          </div>
        </div>
      <button className="donate-btn bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
        Collect Fund
      </button>
    </div>
  );
};

const Artist = () => {
  const { selectedArtist } = useContext(ArtistContext); // Use context to get selected artist

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
      <div className="container-wrapper"></div>
      <div className="profile-container  grid grid-cols-2">
        {selectedArtist ? (
          <UserProfile artist={selectedArtist} />
        ) : (
          <p>No artist selected</p>
        )}
        <div className="songs-container col-span-1 bg-aliceblue dark:bg-gray-900 overflow-auto h-96 flex justify-center items-center flex-col gap-8">
          <div className="add-event-btn-div flex items-center justify-center w-full h-12">
            <CiCirclePlus className="add-event-btn h-8 w-8 text-black dark:text-white cursor-pointer" />
          </div>
          {SongsData.slice(0, index + 1).map((item, idx) => (
            <div
              key={idx}
              className="songs-div bg-yellow-300 dark:bg-yellow-500 self-center text-center h-10 w-80 rounded-md"
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

export default Artist;