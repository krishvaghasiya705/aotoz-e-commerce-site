import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <NavLink
              to={"/"}
              className="text-[16px] font-semibold leading-[20px] font-roboto text-white uppercase"
            >
              home
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[16px] font-semibold leading-[20px] font-roboto text-white uppercase"
            >
              template
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[16px] font-semibold leading-[20px] font-roboto text-white uppercase"
            >
              docs
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[16px] font-semibold leading-[20px] font-roboto text-white uppercase"
            >
              sale
            </NavLink>
          </div>
          <p className="text-[14px] font-playfair">&copy; 2024 Aotoz E-Commerce Site</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-2">
            <NavLink
              to={"/about"}
              className="text-[14px] font-semibold leading-[20px] font-roboto text-white"
            >
              About Us
            </NavLink>
            <NavLink
              to={"/contact"}
              className="text-[14px] font-semibold leading-[20px] font-roboto text-white"
            >
              Contact
            </NavLink>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" className="text-white font-playfair">
              Facebook
            </a>
            <a href="https://twitter.com" className="text-white font-playfair">
              Twitter
            </a>
            <a href="https://instagram.com" className="text-white font-playfair">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
