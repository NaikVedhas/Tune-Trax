import React from "react";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUsPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from "./pages/404notfound";


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />
        {/* Other routes */}
        <Route exact path="/Artist" element={<Artist/>}/>
        <Route exact path="/Profile" element={<Profile/>}/>
        <Route exact path="/aboutus" element={<AboutUs/>}/>
        <Route exact path="*" element={<NotFound/>}/>
        <Route exact path="/Artist" element={<Artist/>}/>
        <Route exact path="/Profile" element={<Profile/>}/>

      </Routes>
    </Router>
  );
}

export default App;