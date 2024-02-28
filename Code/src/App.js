import React from "react";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUsPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from "./pages/404notfound";
import { WagmiProvider, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { mainnet,polygon,sepolia, optimism, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const chains = [mainnet,sepolia,polygon, optimism, arbitrum ];


const config = createConfig(
  getDefaultConfig({

    infuraId:process.env.INFURA_ID, 
    walletConnectProjectId:process.env.WALLETCONNECT_PROJECT_ID,
    chains,

    // Required
    appName: "Crypto Melodies",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();




function App() {
  return (

    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <ConnectKitProvider theme="retro" >
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />
        {/* Other routes */}
        <Route exact path="/Artist" element={<Artist/>}/>
        <Route exact path="/Profile" element={<Profile/>}/>
        <Route exact path="/aboutus" element={<AboutUs/>}/>
        <Route exact path="*" element={<NotFound/>}/>
        <Route exact path="/Artist" element={<Artist/>}/>
        {/* <Route exact path="/CheckProfile" element={<CheckProfile/>}/> */}
      </Routes>
    </Router>
    </ConnectKitProvider>
    </QueryClientProvider>
    </WagmiProvider>

  );
}

export default App;