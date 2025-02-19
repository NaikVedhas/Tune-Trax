import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { GoPlusCircle } from "react-icons/go";
import "../css/profile.css";
import { useWriteContract } from 'wagmi';
import { ethers } from "ethers";

import abi from "../Metadata/Abi.json";
import contractAddress from "../Metadata/ContractAddress";
import { useAccount } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { useReadContract } from "wagmi";
import Addsongs from "../components/Addsongs";
import Footer from "../components/Footer";
import AddMember from "../components/AddAcessMember";
import ShowMember from "../components/ShowAccessMember";

const UserProfile = ({ parameter, parameter2 }) => {

    const [showsongform, setshowsongform] = useState(false);
    const [showaddaccessform, setshowaddaccessform] = useState(false);
    const [showaccessMemberform, setshowaccessMemberform] = useState(false);

    const account = useAccount();
    const { writeContract } = useWriteContract();

    const collectFunds = (ind) => {

        return (writeContract({
            abi,
            address: contractAddress,
            functionName: "collectFunds",
            args: [
                ind,
            ],
            account: account.address,
            chainId: sepolia.id

        }));
    }

    if (!parameter) {
        return <div className="artist-not-found" style={{ color: "white" }}>Sorry This is only for Artist</div>
    }

    return (
        <>
            <Navbar />
            <div className="user-info-container">
                <div className="user-img-container">
                    <img src={parameter.imageHash} width="100%" alt="userimage" />
                </div>
                <div className="user-info">
                    <p className="verified-artist">
                        <span className="icons"></span> Verified Artist
                    </p>
                    <p className="user-name">{parameter.name}</p>
                    <p>{parameter.location}</p>
                    <div className="social">
                        <a href={parameter.instaId} target='_blank'>
                            <img src="../insta-.png" alt="insta" className="insta" />
                        </a>
                        <a href={parameter.twitterId} target='_blank'>
                            <img src="../x.png" alt="twitter" className="twitter" />
                        </a>
                    </div>
                </div>
                <div className="other-info">
                    {/* <BsPlayCircle className="play-btn" /> */}
                    <GoPlusCircle className="add-btn" onClick={() => {
                        setshowsongform(true);
                    }} />
                    <button className="donate-btn" onClick={() => collectFunds(parameter2)}>COLLECT FUND</button>
                    {/* <button className="donate-btn" onClick={() => }>Access List</button> */}
                    <button className="download-btn" onClick={() => {
                        setshowaddaccessform(true);
                    }}>Add Access Member</button>
                    <button className="download-btn" onClick={() => {
                        setshowaccessMemberform(true);
                    }}>Show Access Member</button>
                </div>
                
            </div>
            {
                showsongform && (
                    <Addsongs parameter={parameter2} onClose={() => {
                        setshowsongform(false);
                    }} />
                )
            }
            {
                showaddaccessform && (
                    <AddMember parameter={parameter2} onClose={() => {
                        setshowaddaccessform(false);
                    }} />
                )
            }
            {
                showaccessMemberform && (
                    <ShowMember para={parameter} onClose={() => {
                        setshowaccessMemberform(false);
                    }} />
                )
            }
        </>
    );
};

const Profile = () => {

    const account = useAccount();
    const [data,setData]= useState();
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = audioFiles[currentTrack];
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrack, isPlaying]);


    //Taking the exact user 
    // const { data } = useReadContract({
    //     abi,
    //     address: contractAddress,
    //     functionName: "getArrArtist",
    //     chainId: sepolia.id,
    //     account: account.address,
    // });


    const callBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const data = await contract.getArrArtist();
    
        setData(data);
      };

      useEffect(()=>{
        callBlockchainData();
      },[])
    let indexOfArtist;

    if (data) {

        indexOfArtist = data.findIndex((obj) => obj.artistAddress === account.address); //I got the index of that Artist
    }
    if (indexOfArtist === -1) {
        return <div className="artist-not-found" style={{ color: "white" }}>Sorry This is only for Artist</div>
    }

    // If data is not available yet, you can render a loading state or return null

    if (!data) {
        return <div className="artist-not-found" >Loading...</div>; // or null or any other loading indicator
    }

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




    const audioFiles = data[indexOfArtist].songsIpfsHash;

    const audioname = data[indexOfArtist].namesOfSongs;

    const array = data[indexOfArtist].imageOfSongs;


    const handleSongClick = (index) => {
        setCurrentTrack(index);
        setIsPlaying(true);
    };

    return (
        <>
            <div className="profile-container">
                <UserProfile parameter={data[indexOfArtist]} parameter2={indexOfArtist} />
                <div className="songs-container">
                    <div className="songs">
                        <h2>Popular</h2>
                        <div className="song">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="about-artist">
                        <h1>About Artist</h1>
                        <p>{data[indexOfArtist].description}</p>
                    </div>
                </div>
            </div>

            <div className="player-container">
                <p className="now-playing">{audioname[currentTrack]}</p>
                <div className="control-btns">
                    <BiSkipPrevious onClick={playPreviousTrack} className="prev-icon" />

                    <audio
                        ref={audioRef}
                        controls
                        controlsList="nodownload"
                        className="audio-container"
                        onEnded={playNextTrack}
                    // autoPlay
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

