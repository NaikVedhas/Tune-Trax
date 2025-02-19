import React, { useState, useContext, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import "../css/profile.css";
import { ArtistContext } from "../context/artContext";
import { useWriteContract } from 'wagmi';
import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress";
import { useAccount } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { parseEther } from 'viem';
import { IndexContext } from "../context/indexContext";
import Donate from "../components/Donate";


const UserProfile = ({ artist }) => {

  const [showdonateform, setshowdonateform] = useState(false);

  return (
    <>
      <Navbar />
      <div className="user-info-container">
        <div className="user-img-container">
          <img src={artist.imageHash} width="100%" alt="userimage" />
        </div>

        <div className="user-info">
          <p className="verified-artist">
            <span className="icons"></span> Verified Artist
          </p>
          <p className="user-name">{artist.name}</p>
          <p>{artist.location}</p>
          <div className="social">
            <a href={artist.instaId} target='_blank'>
              <img src="../insta-.png" alt="insta" className="insta" />
            </a>
            <a href={artist.twitterId} target='_blank'>
              <img src="../x.png" alt="twitter" className="twitter" />
            </a>
          </div>
        </div>

        <div className="other-info">
      
          <button className="donate-btn" onClick={() => {
            setshowdonateform(true);
          }}>DONATE HERE</button>
        </div>
      </div>
      {showdonateform && <Donate onClose={() => {
        setshowdonateform(false);
      }} />}

    </>
  );
};

const Artist = () => {

  const { selectedArtist } = useContext(ArtistContext);
  const { selectedIndex } = useContext(IndexContext);
  const { data: hash, writeContract } = useWriteContract();
  const account = useAccount();

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bb, setBb] = useState(0);
  const audioRef = useRef(null);

  const playNextTrack = () => {
    if (currentTrack < audioFiles.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const playPreviousTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioFiles[currentTrack];
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack, isPlaying]);


  const buyyy = async (props) => {
    let check = false;
    setBb(props);
    for (let i = 0; i < selectedArtist.accessList.length; i++) {

      if (account.address === selectedArtist.accessList[i]) {
        check = true;
      }
    }
    
    if (check === true) {
      return (writeContract({
        abi,
        address: contractAddress,
        functionName: 'buySong',
        args: [
          selectedIndex,
          props,
        ],
        account: account.address,
        chainId: sepolia.id,
        value: parseEther('1'),
      }));
    }
    else {
      return (alert("You don't have Access to download the Song"))
    }

  };



  if (!selectedArtist) {
    return <div className="artist-not-found" >No artist Selected!</div>
  }

  //Fetching data from backend
  const audioFiles = selectedArtist.songsIpfsHash;
  const audioname = selectedArtist.namesOfSongs
  const array = selectedArtist.imageOfSongs;

  const handleSongClick = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const handleDownload = async (link, name) => {
    try {
      const response = await fetch(link);
      const audioBlob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(audioBlob);
      downloadLink.download = name || 'audio-file.mp3';

      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="profile-container">
        {selectedArtist ? (
          <UserProfile artist={selectedArtist} />
        ) : (
          <div className="grid justify-self-center justify-items-center text-align-center text-white text-3xl col-span-2 mt-20">
            No artist selected
          </div>
        )}
        {selectedArtist ? (
          <>
            <div className="songs-container">
              <div className="songs">
                <h2>Popular</h2>
                <div className="song">
                  {hash && <button className="download-btn" onClick={() => handleDownload(audioFiles[bb], audioname[bb])}><h1>Download Song</h1></button>}
                  <div className="all-songs-container">
                    {audioFiles.map((item, index) => (
                      <div className="song-info" key={index}>
                        <img
                          className="song-image"
                          src={array[index]}
                          alt="song poster"
                          onClick={() => handleSongClick(index)}
                        />
                        <p className="song-name">{audioname[index]}</p>
                        <button className="buy-btn" onClick={() => buyyy(index)}>BUY NOW</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-artist">
                <h1>About Artist</h1>
                <p>{selectedArtist.description}</p>
              </div>
            </div>
            <div className="player-container">
              <p className="now-playing">
                {audioname[currentTrack]}
              </p>
              <div className="control-btns">
                <BiSkipPrevious
                  onClick={playPreviousTrack}
                  className="prev-icon"
                />
                <audio
                  ref={audioRef}
                  controls
                  controlsList="nodownload"
                  className="audio-container"
                  onEnded={playNextTrack}
                >
                  <source src={audioFiles[currentTrack]} type="audio/mp3" />
                </audio>
                <BiSkipNext onClick={playNextTrack} className="next-icon" />
              </div>
            </div>
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default Artist;