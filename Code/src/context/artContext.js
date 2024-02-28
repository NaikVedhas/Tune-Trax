import React, { useState, createContext } from 'react';

// Create context
const ArtistContext = createContext();

// Create provider component
const ArtistProvider = ({ children }) => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <ArtistContext.Provider value={{ selectedArtist, setSelectedArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};

export { ArtistProvider, ArtistContext };