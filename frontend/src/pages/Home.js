import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArtistContext } from "../context/artContext";  


const ArtistCard = ({ artist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedArtist } = useContext(ArtistContext); // Accessing setSelectedArtist from context

  const handleArtistClick = () => {
    setSelectedArtist(artist); // Setting the selected artist in the context
  };

  return (
    <Link to="/Artist" onClick={handleArtistClick}> {/* Removed state from Link */}
      <div
        className={`max-w-lg rounded overflow-hidden shadow-lg bg-transparent transition-transform duration-300 transform hover:scale-105 ${
          isHovered ? "shadow-xl" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ height: "500px" }} // Adjust the height here as needed
      >
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
      </div>
    </Link>
  );
};

const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Fetch artist data here and update the artists state
    // Example fetch call:
    // fetch('api/artists')
    //   .then(response => response.json())
    //   .then(data => setArtists(data));
    // For demo purpose, initializing with dummy data
    const dummyData = [
      { id: 1, name: 'Aston Merrygold', image: 'https://www.thesun.co.uk/wp-content/uploads/2023/10/aston-merrygold-attends-day-2-771041473-1.jpg' },
      { id: 2, name: 'Concha Buika', image: 'https://s3.amazonaws.com/allaboutjazz/media/large/9/2/0/28dbe4ffae972481d50126d35857b.jpg' },
      { id: 3, name: 'Floor Jansen', image: 'https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2022/05/Nightwish-01.jpg' },
      { id: 4, name: 'Hanbyeol', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAe8KgltkWcScuuxqCYU2srDjDHa3bwsJTaQ&usqp=CAU' },
      { id: 5, name: 'Morgan James', image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Morgan_James_Profile_Wikipedia.png' },
      { id: 6, name: 'kaleigh baker', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7z_SIYh8BWga5FSRAP-Je_NYNOm33G72Kw&usqp=CAU' },
      { id: 7, name: 'kalenna', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/KalenaHarper10.jpg' },
      { id: 8, name: 'Junny', image: 'https://smartcdn.gprod.postmedia.digital/vancouversun/wp-content/uploads/2022/08/0903-junny-new-w.jpg' },
      { id: 9, name: 'Yebba', image: 'https://imagevars.gulfnews.com/magazines/friday/1856168683_large.jpg' },
      { id: 10, name: 'Yezi', image: 'https://cdns-images.dzcdn.net/images/artist/9d744b16785b2c3678dbf735b0a15c82/500x500.jpg' },
      
    ];
    setArtists(dummyData);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Discover Artists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Home;