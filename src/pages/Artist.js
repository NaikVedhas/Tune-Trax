import React, { useState, useContext ,useRef , useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { BsPlayCircle } from "react-icons/bs";
import "../css/profile.css";
import { ArtistContext } from "../context/artContext";
import Donate from "../components/Donate";

const UserProfile = ({ artist }) => {

  const [showdonateform , setshowdonateform] = useState(false);

  return (
    <>
      <Navbar />
      <div className="user-info-container">
        <div className="user-img-container">
          <img src={artist.image} width="100%" alt="userimage" />
        </div>

        <div className="user-info">
          <p className="verified-artist">
            <span className="icons"></span> Verified Artist
          </p>
          <p className="user-name">{artist.name}</p>
          <p>location</p>

          <div className="social">
            <a href={artist.name}>
              <img src="../instagram.png" alt="insta" className="insta" />
            </a>
            <a href={artist.name}>
              <img src="../x-twitter.png" alt="twitter" className="twitter" />
            </a>
          </div>
        </div>

        <div className="other-info">
          <BsPlayCircle className="play-btn" />
          <button
            className="donate-btn"
            onClick={() => {
              setshowdonateform(true);
            }}
          >
            DONATE HERE
          </button>
        </div>
      </div>
      {showdonateform && (
        <Donate
          onClose={() => {
            setshowdonateform(false);
          }}
        />
      )}
    </>
  );
};

const Artist = () => {

  const { selectedArtist } = useContext(ArtistContext);

  const [songs, setSongs] = useState([]);
  const [songname, setsongname] = useState([]);
  const [songarray, setsongarray] = useState([]);
  const [showSongs, setShowSongs] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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

    const audioFiles = [
      "../Song1.mp3",
      "../Song2.mp3",
      "songurl",
      "songurl",
      "songurl",
    ];

    const audioname = [
      "Chhukkar mere man ko",
      "Korean song",
      "I go back to you",
      "August",
      "Always",
    ];

    const array = [
      "https://i.scdn.co/image/ab67616d00001e02e531b6377d63e54c0a1ff523",
      "https://i.pinimg.com/236x/a3/e3/4a/a3e34ac1739fe0dfc6371e2bc8ea57c9.jpg",
      "https://m.media-amazon.com/images/M/MV5BYjYwM2ExZjEtNzQyNC00NDViLTk5ZDgtN2E3MDY0ZTE2NjFjXkEyXkFqcGdeQXVyMTI1Mzg0ODA5._V1_FMjpg_UX640_.jpg",
      "https://i.pinimg.com/564x/c2/c9/d1/c2c9d188a78515046c3f923aa2714ef2.jpg",
      "https://rukminim2.flixcart.com/image/832/832/kzsqykw0/poster/g/c/q/small-descendants-of-the-sun-song-hye-and-song-jhoog-korean-original-imagbq94hdw8frhm.jpeg?q=70&crop=false",
    ];

    const handleClick = () => {
      setSongs(audioFiles); /*Song url*/
      setsongname(audioname); /*Song name*/
      setsongarray(array); /*Song image*/
      setShowSongs(true);
    };

    const handleSongClick = (index) => {
      setCurrentTrack(index);
      setIsPlaying(true);
    };

  return (
    <>
      <Navbar />

      {selectedArtist ? (
        <UserProfile artist={selectedArtist} />
      ) : (
        <p className="artist-not-found">No artist selected</p>
      )}

      {selectedArtist ? (
        <>
          <div className="profile-container">
            <div className="songs-container">
              <div className="songs">
                <h2>Popular</h2>

                <div className="song">
                  {showSongs && (
                    <div className="all-songs-container">
                      {songs.map((item, index) => (
                        <div className="song-info" key={index}>
                          <img
                            className="song-image"
                            src={songarray[index]}
                            alt="song poster"
                            onClick={() => handleSongClick(index)}
                          />
                          <p className="song-name">{songname[index]}</p>
                          <button className="buy-btn">BUY NOW</button>
                          {/* song timestamps */}
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={handleClick}>Display Songs</button>
                  {/* remove this button */}
                </div>
              </div>

              <div className="about-artist">
                <h1>About Artist</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
                  quos ea recusandae velit architecto dolore quaerat quisquam
                  magni quas eum perferendis rerum error consectetur quis!
                  Repellat totam iste dolores commodi.
                </p>
              </div>
            </div>

            <div className="player-container">
              {/* <AudioPlayer audioList={audioFiles} /> */}
              <p className="now-playing">{audioname[currentTrack]}</p>

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
                  autoPlay
                >
                  <source src={audioFiles[currentTrack]} type="audio/mp3" />
                </audio>

                <BiSkipNext onClick={playNextTrack} className="next-icon" />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Footer />
    </>
  );
};

export default Artist;
