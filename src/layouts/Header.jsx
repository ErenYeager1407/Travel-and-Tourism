import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuIcon, XIcon } from "../components/shared/Icons";
import { logoutUser } from "../lib/appwrite"; // <-- your logout function

/**
 * UserDropdown Component
 * Handles the avatar button and dropdown menu for logged-in users
 */
function UserDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {user.username ? user.username[0].toUpperCase() : "U"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-xl z-50 border dark:border-gray-700 transition-all duration-300 ease-in-out">
          <div className="p-4 border-b dark:border-gray-700">
            <p className="font-semibold text-dark dark:text-white truncate">{user.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header({ authUser, setAuthUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null); // update parent/auth context
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/deals", label: "Deals" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary dark:text-white font-bold"
      : "text-dark dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300";

  const closeMobileMenu = () => setIsMenuOpen(false);

  const isLoggedIn = !!authUser;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-lg dark:shadow-black/20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
          IndiTrails
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={getNavLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <UserDropdown user={authUser} onLogout={handleLogout} />
          ) : (
            <>
              <NavLink to="/login" className={getNavLinkClass}>
                Login
              </NavLink>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-dark dark:text-gray-200 focus:outline-none"
            aria-label="Open main menu"
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
            aria-label="Close menu"
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

        {/* Mobile Auth Section */}
        <div className="mt-12 flex flex-col items-center space-y-6 px-6">
          {isLoggedIn ? (
            <>
              <div className="text-center">
                <p className="text-2xl font-semibold text-dark dark:text-white truncate">
                  {authUser.username}
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 truncate">
                  {authUser.email}
                </p>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full max-w-xs bg-red-500 text-white text-xl px-8 py-3 rounded-full hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-2xl text-dark dark:text-gray-200 hover:text-primary"
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
