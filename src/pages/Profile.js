import { useState, useRef, useEffect } from "react";
import { BsPlayCircle } from "react-icons/bs";
import Navbar from "../components/Navbar";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { GoPlusCircle } from "react-icons/go";
import "../css/profile.css";
import Footer from "../components/Footer";
import Addsongs from "../components/Addsongs";


const UserProfile = ({ parameter }) => {

  const [showsongform, setshowsongform] = useState(false);

  return (
    <>
      <Navbar />
      <div className="user-info-container">
        <div className="user-img-container">
          <img src={parameter.userimage} width="100%" alt="userimage" />
        </div>

        <div className="user-info">
          <p className="verified-artist">
            <span className="icons"></span> Verified Artist
          </p>
          <p className="user-name">{parameter.username}</p>
          <p>{parameter.location}</p>
          <p>{parameter.instaid}</p>
          <p>{parameter.twitterid}</p>
        </div>

        <div className="other-info">
          <BsPlayCircle className="play-btn" />
          <GoPlusCircle className="add-btn"  onClick={() => {
            setshowsongform(true);
          }}/>
          <button className="donate-btn">COLLECT FUND</button>
        </div>
      </div>
       {
        showsongform && (
          <Addsongs onClose={() => {
            setshowsongform(false);
          }} />
        )
      }
    </>
  );
};

const Profile = () => {

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


  const audioFiles = ["../Song1.mp3", "../Song2.mp3", "songurl" , "songurl" ,"songurl"];

  const audioname = [ "Chhukkar mere man ko","Korean song","I go back to you", "August", "Always"];

  const array = [
    "https://i.scdn.co/image/ab67616d00001e02e531b6377d63e54c0a1ff523",
    "https://i.pinimg.com/236x/a3/e3/4a/a3e34ac1739fe0dfc6371e2bc8ea57c9.jpg",
    "https://m.media-amazon.com/images/M/MV5BYjYwM2ExZjEtNzQyNC00NDViLTk5ZDgtN2E3MDY0ZTE2NjFjXkEyXkFqcGdeQXVyMTI1Mzg0ODA5._V1_FMjpg_UX640_.jpg",
    "https://i.pinimg.com/564x/c2/c9/d1/c2c9d188a78515046c3f923aa2714ef2.jpg",
    "https://rukminim2.flixcart.com/image/832/832/kzsqykw0/poster/g/c/q/small-descendants-of-the-sun-song-hye-and-song-jhoog-korean-original-imagbq94hdw8frhm.jpeg?q=70&crop=false",
  ];

  const userProfileData = [
    {
      userimage:
        "https://www.navhindtimes.in/wp-content/uploads/2023/08/Genevieve-DSouza.jpeg.jpg",
      username: "Aastha Mhatre",
      location: "Alibag ,Raigad",
      instaid: "Aastha_2675",
      twitterid: "aastha",
    },
    {
      userimage:
        "https://t3.ftcdn.net/jpg/03/26/52/14/360_F_326521465_d3Lv3za5GEGqYAR3M8bem2mHY1vjvmJP.jpg",
      username: "Aadya Mhatre",
      location: "Alibag , Raigad",
      instaid: "__abc._24",
      twitterid: "abc@twitter",
    },
    {
      userimage:
        "https://static.vecteezy.com/system/resources/previews/029/630/463/non_2x/handsome-young-male-singer-holds-a-microphone-stand-and-performs-on-a-concert-stage-free-photo.jpeg",
      username: "Aarsh Mhatre",
      location: "Alibag , Raigad",
      instaid: "abc_2504",
      twitterid: "abc@twitter",
    },
  ];



  const handleSongClick = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="profile-container">
        <UserProfile parameter={userProfileData[0]} />
        <div className="songs-container">
          <div className="songs">
            <h2>Popular</h2>

            <div className="song">
              {/* {showSongs && ( */}
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
                      
                      {/* song timestamps */}
                    </div>
                  ))}
                </div>
              {/* )} */}

              {/* remove this button */}
            </div>
          </div>

          <div className="about-artist">
            <h1>About Artist</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              quos ea recusandae velit architecto dolore quaerat quisquam magni
              quas eum perferendis rerum error consectetur quis! Repellat totam
              iste dolores commodi.
            </p>
          </div>
        </div>
      </div>

      <div className="player-container">
        {/* <AudioPlayer audioList={audioFiles} /> */}
        <p className="now-playing">{audioname[currentTrack]}</p>

        <div className="control-btns">
          <BiSkipPrevious onClick={playPreviousTrack} className="prev-icon" />

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
      <Footer />
    </>
  );
};

export default Profile;

