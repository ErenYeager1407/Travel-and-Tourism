import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuIcon, XIcon } from "../components/shared/Icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/deals", label: "Deals" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-primary dark:text-white font-semibold"
      : "text-dark dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300";
  };
  
  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-lg dark:shadow-black/20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
          TravelCo India
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={getNavLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/profile" className={getNavLinkClass}>
            Login
          </NavLink>
          <Link
            to="/profile"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full 
                       transition-all duration-300 shadow-md 
                       hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-dark dark:text-gray-200 focus:outline-none"
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-6 mt-4">
          <button
            onClick={closeMobileMenu}
            className="text-dark dark:text-gray-200"
          >
            <XIcon />
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-8 mt-12">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="text-2xl text-dark dark:text-gray-200 hover:text-primary"
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-center space-y-6">
          <NavLink
            to="/profile"
            className="text-2xl text-dark dark:text-gray-200 hover:text-primary"
            onClick={closeMobileMenu}
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            className="bg-accent text-white text-xl px-8 py-3 rounded-full hover:bg-opacity-90"
            onClick={closeMobileMenu}
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
}