import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="text-sm mt-12 py-8">
      <div className="container mx-auto px-10 flex flex-wrap justify-between items-center">
        {/* Newsletter Section */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <p className="mb-1 text-[12px] text-black">SUBSCRIBE TO NEWSLETTER</p>
          <form className="flex w-[220px] items-center border border-black">
            <input
              type="email"
              placeholder="EMAIL"
              className="outline-none flex-1 text-black bg-white px-[10px] pt-[7px]"
            />
            <button type="submit" className="text-black text-lg font-bold p-1">
              <ArrowUpRightIcon className="size-6" />
            </button>
          </form>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-3 md:mb-0 text-[#222323]">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="size-5" />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook className="size-5" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter className="size-5" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="w-full md:w-auto flex-wrap justify-between text-xs text-[#222323] space-x-6 hidden sm:flex">
          <a href="#">LOCATIONS</a>
          <a href="#">CONTACT</a>
          <a href="#">SHIPPING/RETURNS</a>
          <a href="#">POLICIES</a>
          <a href="#">ACCESSIBILITY</a>
          <a href="#" className="max-w-[168px]">
            DO NOT SELL MY PERSONAL INFORMATION
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-xs text-[#888888] md:text-end lg:text-end md:max-w-[196px] lg:max-w-[196px]">
          <p>Copyright © 2024 Undefeated Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
