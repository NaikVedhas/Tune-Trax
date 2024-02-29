import React from "react";
import { Link } from "react-router-dom";
import "../../src/index.css";

const Footer = () => {
  return (
    <div className="w-full mt-32 bottom-0">
      <footer className="footer text-black">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="" className="flex items-center">
                <img className="self-center text-2xl font-semibold whitespace-nowrap h-20" src="../website-name-for-footer.png" alt="TuneTrax">
                </img>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <Link to="/">
                  <h2 className="mb-6 font-semibold uppercase">Home</h2>
                </Link>
                <ul className="font-medium">
                  <li className="mb-4 text-center">
                    <Link to="/Aboutus" className="hover:underline">
                      About us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <Link to="/Profile">
                  <h2 className="mb-6  font-semibold uppercase">Profile</h2>
                </Link>
                <ul className="font-medium">
                  <li className="mb-4 text-center">
                    <Link
                      to="https://github.com/NaikVedhas/43_EtherealElites_BnB24"
                      className="hover:underline "
                    >
                      Github
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6  font-semibold uppercase">Legal</h2>
                <ul className="font-medium">
                  <li className="mb-4 text-center">
                    <Link to="#" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="text-center">
                    <Link to="#" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-black sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm">© 2024 All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              
             
            
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;