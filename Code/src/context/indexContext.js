import React, { useState, createContext } from 'react';

// Create context
const IndexContext = createContext();

// Create provider component
const IndexProvider = ({ children }) => {
  const [selectedIndex,setSelectedIndex] = useState(null);

  return (
    <IndexContext.Provider value={{ selectedIndex,setSelectedIndex }}>
      {children}
    </IndexContext.Provider>
  );
};

export { IndexProvider, IndexContext };