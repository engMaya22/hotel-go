import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div class="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-[#F6F9FC]">
      <div class="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
        <div class="max-w-96">
          <img
            className="mb-4 h-8 md:h-9 invert opacity-80"
            src={assets.logo}
            alt="logo"
          />
          <p className="text-sm">
            Discover the world's most extraordinary places to stay , from
            boutique hotels to luxury and private islands.
          </p>
          <div class="flex items-center gap-2 mt-3">
            <img
              src={assets.instagramIcon}
              alt="instagram-icon"
              className="w-6"
            />
            <img
              src={assets.facebookIcon}
              alt="facebook-icon"
              className="w-6"
            />
            <img src={assets.twitterIcon} alt="twitter-icon" className="w-6" />
          </div>
        </div>

        <div class="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div>
            <h2 class="font-playfair text-lg text-gray-800">RESOURCES</h2>
            <ul class="text-sm text-gray-500 space-y-2 list-none">
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              {/* <li>
                <a href="#">Blog</a>
              </li> */}
              <li>
                <a href="#">Community</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="font-playfair text-lg text-gray-800">COMPANY</h2>
            <div class="text-sm text-gray-500 space-y-2 list-none">
              <li>
                <a href="#">About</a>
              </li>
              {/* <li>
                <a href="#">Careers</a>
              </li> */}
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
            </div>
          </div>
        </div>
      </div>
      <p class="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All
        Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
