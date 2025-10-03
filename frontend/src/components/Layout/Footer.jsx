import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebookF, FaTwitter } from "react-icons/fa";
import LOGO_IMG from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-gradient-to-r from-[#FFE1B3] to-[#FFF7D1] text-black px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={LOGO_IMG}
              alt="Interview Prep AI Logo"
              className="h-8 w-auto object-contain rounded-full"
            />
            <span className="font-semibold text-lg">Interview Prep AI</span>
          </Link>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="h-5 w-5 hover:opacity-70 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube className="h-5 w-5 hover:opacity-70 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="h-5 w-5 hover:opacity-70 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="h-5 w-5 hover:opacity-70 transition" />
            </a>
          </div>
        </div>

        {/* Single Line Bottom */}
        <div className="mt-2 text-center text-sm opacity-90">
          © {new Date().getFullYear()} Interview Prep AI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
