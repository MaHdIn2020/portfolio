// src/components/Navbar.jsx
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { id: 1, text: "Home", to: "home" },
    { id: 2, text: "About", to: "about" },
    { id: 3, text: "Education", to: "education" },
    { id: 4, text: "Skills", to: "skills" },
    { id: 5, text: "Projects", to: "projects" },
    { id: 6, text: "Contact", to: "contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#E52521] border-b-4 border-black shadow-[0_4px_0_#000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <RouterLink to="/" className="text-sm sm:text-xl font-bold tracking-wide text-white pixel-text hover:text-[#FBD000] transition-colors duration-300 drop-shadow-[2px_2px_0_#000]">
            Tanjip Mahdin
          </RouterLink>

          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map(({ id, text, to }) => (
              isHome ? (
                <ScrollLink
                  key={id}
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-60}
                  className="relative text-white hover:text-[#FBD000] transition-colors duration-300 pixel-text text-xs lg:text-sm cursor-pointer group drop-shadow-[2px_2px_0_#000]"
                >
                  {text}
                </ScrollLink>
              ) : (
                <a
                  key={id}
                  href={`/#${to}`}
                  className="relative text-white hover:text-[#FBD000] transition-colors duration-300 pixel-text text-xs lg:text-sm cursor-pointer group drop-shadow-[2px_2px_0_#000]"
                >
                  {text}
                </a>
              )
            ))}
            <RouterLink
              to="/anime"
              className="relative text-[#FBD000] hover:text-white transition-colors duration-300 pixel-text text-xs lg:text-sm cursor-pointer group drop-shadow-[2px_2px_0_#000] animate-pulse"
            >
              Anime
            </RouterLink>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hover:text-[#FBD000]"
            >
             <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
             </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#43B047] border-t-4 border-black">
          <div className="px-2 pt-2 pb-3 space-y-2">
            {navLinks.map(({ id, text, to }) => (
               isHome ? (
                <ScrollLink
                  key={id}
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-60}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white hover:text-[#FBD000] pixel-text text-sm drop-shadow-[2px_2px_0_#000]"
                >
                  {text}
                </ScrollLink>
               ) : (
                <a
                  key={id}
                  href={`/#${to}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white hover:text-[#FBD000] pixel-text text-sm drop-shadow-[2px_2px_0_#000]"
                >
                  {text}
                </a>
               )
            ))}
            <RouterLink
              to="/anime"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-[#FBD000] hover:text-white pixel-text text-sm drop-shadow-[2px_2px_0_#000]"
            >
              Anime
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
