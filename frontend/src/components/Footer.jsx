import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import Logo from "./LearnSpace logo.png"; // Assuming logo is in the same directory or check import in Home.jsx

const Footer = () => {
  return (
    <footer className="bg-indigo-50 border-t border-indigo-100 pt-16 pb-8 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="LearnSpace Logo" className="w-8 h-8 object-contain" />
              <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LearnSpace
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Empowering learners with tools to organize, track, and master their educational journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link to="/kanban" className="text-gray-500 hover:text-indigo-600 transition-colors">Kanban Board</Link></li>
              <li><Link to="/books" className="text-gray-500 hover:text-indigo-600 transition-colors">BookSpace</Link></li>
              <li><Link to="/whiteboard" className="text-gray-500 hover:text-indigo-600 transition-colors">Whiteboard</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6">Community</h4>
            <ul className="space-y-3">
              <li><Link to="/contributors" className="text-gray-500 hover:text-indigo-600 transition-colors">Contributors</Link></li>
              <li><Link to="/about-us" className="text-gray-500 hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Join Discord</a></li>
              <li><Link to="/feedback" className="text-gray-500 hover:text-indigo-600 transition-colors">Feedback</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
               <a href="#" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-indigo-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LearnSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>by LearnSpace Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
