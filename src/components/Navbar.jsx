// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 1, text: "Home", to: "home" },
    { id: 2, text: "About", to: "about" },
    { id: 3, text: "Skills", to: "skills" },
    { id: 4, text: "Projects", to: "projects" },
    { id: 5, text: "Contact", to: "contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <div className="text-xl sm:text-2xl font-bold tracking-wide text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
            Tanjip Mahdin
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(({ id, text, to }) => (
              <Link
                key={id}
                to={to}
                smooth={true}
                duration={500}
                offset={-60}
                className="relative text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium cursor-pointer group"
              >
                {text}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="text-gray-300 focus:outline-none hover:text-indigo-400 transition-colors duration-300"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-2">
            {navLinks.map(({ id, text, to }) => (
              <Link
                key={id}
                to={to}
                smooth={true}
                duration={500}
                offset={-60}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-gray-300 hover:text-indigo-400 hover:bg-gray-900 transition-colors duration-300 font-medium"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
