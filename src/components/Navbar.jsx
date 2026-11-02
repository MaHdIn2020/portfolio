// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiBriefcase,
  FiAward,
  FiCpu,
  FiFolder,
  FiBookOpen,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/profile";

const navLinks = [
  { id: 1, text: "Home", to: "home", icon: <FiHome size={16} /> },
  { id: 2, text: "About", to: "about", icon: <FiUser size={16} /> },
  { id: 3, text: "Experience", to: "experience", icon: <FiBriefcase size={16} /> },
  { id: 4, text: "Education", to: "education", icon: <FiAward size={16} /> },
  { id: 5, text: "Skills", to: "skills", icon: <FiCpu size={16} /> },
  { id: 6, text: "Projects", to: "projects", icon: <FiFolder size={16} /> },
  { id: 7, text: "Research", to: "research", icon: <FiBookOpen size={16} /> },
  { id: 8, text: "Contact", to: "contact", icon: <FiMail size={16} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Auto-close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-[#0a0a12]/95 backdrop-blur-md border-b border-[#00e5ff]/15 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          {/* Logo */}
          <RouterLink
            to="/"
            onClick={() => setIsOpen(false)}
            aria-label="Tanjip Surait Mahdin — Home"
            className="flex items-center gap-2.5 text-decoration-none group"
          >
            <span className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-[#00e5ff] tracking-tight group-hover:text-white transition-colors">
              TSM
            </span>
            <span className="w-px h-5 bg-[#00e5ff]/30" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
              Portfolio
            </span>
          </RouterLink>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ id, text, to }) =>
              isHome ? (
                <ScrollLink
                  key={id}
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="nav-link text-slate-400 hover:text-[#00e5ff] text-sm font-medium cursor-pointer transition-colors"
                  activeClass="text-[#00e5ff] font-semibold"
                  spy={true}
                >
                  {text}
                </ScrollLink>
              ) : (
                <a
                  key={id}
                  href={`/#${to}`}
                  className="nav-link text-slate-400 hover:text-[#00e5ff] text-sm font-medium transition-colors"
                >
                  {text}
                </a>
              )
            )}
            <a
              href="mailto:tanjip.surait.mahdin@gmail.com"
              className="btn-primary py-2 px-5 text-xs font-semibold uppercase tracking-wider"
              aria-label="Send email to hire Tanjip"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="md:hidden w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-[#00e5ff] hover:bg-cyan-500/20 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/40"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Drawer */}
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-[70px] left-0 right-0 z-40 md:hidden bg-[#0a0a12]/98 backdrop-blur-2xl border-b border-[#00e5ff]/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] max-h-[calc(100dvh-70px)] overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-5 flex flex-col gap-1.5">
                {navLinks.map(({ id, text, to, icon }) => (
                  <div key={id}>
                    {isHome ? (
                      <ScrollLink
                        to={to}
                        smooth={true}
                        duration={500}
                        offset={-70}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between p-3 rounded-xl text-slate-300 hover:text-white hover:bg-cyan-500/10 active:bg-cyan-500/15 border border-transparent hover:border-cyan-500/20 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00e5ff] group-hover:scale-105 transition-transform">
                            {icon}
                          </div>
                          <span className="text-sm font-medium font-['Space_Grotesk']">
                            {text}
                          </span>
                        </div>
                        <FiChevronRight
                          size={16}
                          className="text-slate-500 group-hover:text-[#00e5ff] group-hover:translate-x-0.5 transition-all"
                        />
                      </ScrollLink>
                    ) : (
                      <a
                        href={`/#${to}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between p-3 rounded-xl text-slate-300 hover:text-white hover:bg-cyan-500/10 active:bg-cyan-500/15 border border-transparent hover:border-cyan-500/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00e5ff] group-hover:scale-105 transition-transform">
                            {icon}
                          </div>
                          <span className="text-sm font-medium font-['Space_Grotesk']">
                            {text}
                          </span>
                        </div>
                        <FiChevronRight
                          size={16}
                          className="text-slate-500 group-hover:text-[#00e5ff] group-hover:translate-x-0.5 transition-all"
                        />
                      </a>
                    )}
                  </div>
                ))}

                {/* Mobile Drawer Footer with CTA & Socials */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-3.5">
                  <a
                    href="mailto:tanjip.surait.mahdin@gmail.com"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full text-center py-3 flex items-center justify-center gap-2 text-sm font-semibold shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                  >
                    <FiMail size={16} />
                    <span>Hire Me / Get In Touch</span>
                  </a>

                  {/* Quick Social Row */}
                  <div className="flex items-center justify-center gap-3 pt-1">
                    {[
                      { icon: <FaGithub size={18} />, href: profile.links.github, label: "GitHub" },
                      { icon: <FaLinkedin size={18} />, href: profile.links.linkedin, label: "LinkedIn" },
                      { icon: <FaFacebook size={18} />, href: profile.links.facebook, label: "Facebook" },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-slate-300 hover:text-[#00e5ff] hover:border-cyan-500/40 transition-colors"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
