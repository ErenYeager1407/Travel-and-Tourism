import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuIcon, XIcon } from "../components/shared/Icons";
import { logoutUser } from "../lib/appwrite";

// ✅ Dropdown for logged-in user
function UserDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:cursor-pointer flex items-center justify-center w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg"
      >
        {user?.name ? user.name[0].toUpperCase() : "U"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="p-3 border-b dark:border-gray-700">
            <p className="font-semibold text-dark dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
          <button
            onClick={async () => {
              setIsOpen(false);
              await onLogout();
            }}
            className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-md"
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
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

const getNavLinkClass = ({ isActive }) =>{ // console.log(isActive)
  return isActive ?
   "text-[#0B1623] text-white font-bold" :
    "text-dark dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors";
}



  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-primary dark:text-white"
        >
          IndiTrails
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => getNavLinkClass({ isActive })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {authUser ? (
            <UserDropdown user={authUser} onLogout={handleLogout} />
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => getNavLinkClass({ isActive })}
              >
                Login
              </NavLink>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:-translate-y-0.5 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
<div className="md:hidden">
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="text-dark dark:text-gray-200"
  >
    {isMenuOpen ? <XIcon /> : <MenuIcon />}
  </button>

  {/* Mobile menu */}
  {isMenuOpen && (
  <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-start p-4 space-y-3 md:hidden z-40">
    {navLinks.map((link) => (
      <li key={link.to} className="w-full">
        <NavLink
          to={link.to}
          className={({ isActive }) => getNavLinkClass({ isActive })}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </NavLink>
      </li>
    ))}

    {authUser ? (
      <li className="w-full flex justify-end">
        <UserDropdown user={authUser} onLogout={handleLogout} />
      </li>
    ) : (
      <li className="w-full flex justify-between gap-2">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            getNavLinkClass({ isActive }) + " flex-1 text-center py-2 border rounded"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </NavLink>
        <Link
          to="/signup"
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-center py-2 rounded hover:-translate-y-0.5 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign Up
        </Link>
      </li>
    )}
  </ul>
)}


</div>

      </nav>
    </header>
  );
}
