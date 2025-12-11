import React from "react";
import { SiInstagram, SiFacebook, SiGithub } from "react-icons/si";


const Footer = () => {
  return (
    <div className="bg-red-500 justify-center items-center p-4 mt-8">
      <div className="flex text-white justify-center p-4 mt-4 gap-10 md:gap-50 flex-wrap">
        <div>
          <p className="text-bold">Company</p>
          <ul className="">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Courses</li>
          </ul>
        </div>
        <div>
          <p>Resources</p>
          <ul className="">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Courses</li>
          </ul>
        </div>
        <div className="md:text-left text-center">
          <p>Contacts</p>
          <ul className="md:text-left text-center">
            <li>Address:123 Learning St, Knowledge City, EduState, 45678</li>
            <li>Email:upskilllearning12@gmail.com</li>
            <li>Phone:+1234567890</li>
          </ul>
        </div>
        <div className="gap-4">
          <p>Social</p>
          <div className="flex mt-2 gap-4">
            <SiInstagram />
            <SiFacebook />
            <SiGithub />
          </div>
        </div>
      </div>
      <div className="text-center text-white mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
        &copy; {new Date().getFullYear()} MentorMatch. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
