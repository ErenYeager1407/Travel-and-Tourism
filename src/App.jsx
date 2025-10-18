import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  NavLink,
  Link,
} from "react-router-dom";

// --- AUGMENTED MOCK DATA ---
const indianDestinationsData = [
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg",
    title: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description:
      "Witness the timeless beauty of the ivory-white marble mausoleum, a symbol of eternal love.",
    rating: 5,
    price: 150,
    flights: [
      { airline: "IndiGo", price: 120 },
      { airline: "Vistara", price: 150 },
      { airline: "Air India", price: 135 },
    ],
    hotels: [
      { name: "The Oberoi Amarvilas", rating: 5, price: 450 },
      { name: "Trident Agra", rating: 4, price: 250 },
      { name: "Hotel Taj Resorts", rating: 3, price: 150 },
    ],
    cabs: [
      { type: "Sedan (Full Day)", price: 40 },
      { type: "SUV (Full Day)", price: 60 },
    ],
  },
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Alappuzha_Boat_Beauty_W.jpg",
    title: "Kerala Backwaters",
    location: "Alleppey, Kerala",
    description:
      "Cruise through the serene network of lakes, canals, and lagoons on a traditional houseboat.",
    rating: 5,
    price: 220,
    flights: [
      { airline: "SpiceJet", price: 180 },
      { airline: "Vistara", price: 210 },
    ],
    hotels: [
      { name: "Marari Beach Resort", rating: 5, price: 380 },
      { name: "Punnamada Resort", rating: 4, price: 220 },
    ],
    cabs: [{ type: "Local Taxi (8 hours)", price: 50 }],
  },
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    title: "Hawa Mahal",
    location: "Jaipur, Rajasthan",
    description:
      'Explore the "Pink City" and its majestic palaces, vibrant markets, and rich history.',
    rating: 4,
    price: 180,
    flights: [
      { airline: "IndiGo", price: 90 },
      { airline: "AirAsia", price: 85 },
    ],
    hotels: [
      { name: "Rambagh Palace", rating: 5, price: 600 },
      { name: "Samode Haveli", rating: 4, price: 300 },
    ],
    cabs: [
      { type: "Auto Rickshaw Tour", price: 25 },
      { type: "Private Car (Full Day)", price: 55 },
    ],
  },
  {
    imageUrl:
      "https://www.onthegotours.com/cdn-cgi/image/f=auto,q=80,w=506/repository/Sandy-beach-in-Goa--India-Tours--On-The-Go-Tours-346991495533921.jpg",
    title: "Goa Beaches",
    location: "Goa",
    description:
      "Relax on sun-kissed beaches, enjoy vibrant nightlife, and savor delicious seafood.",
    rating: 4,
    price: 250,
    flights: [
      { airline: "IndiGo", price: 110 },
      { airline: "Vistara", price: 140 },
      { airline: "GoFirst", price: 100 },
    ],
    hotels: [
      { name: "Taj Fort Aguada", rating: 5, price: 400 },
      { name: "W Goa", rating: 5, price: 550 },
      { name: "Calangute Residency", rating: 3, price: 120 },
    ],
    cabs: [
      { type: "Scooter Rental (Per Day)", price: 15 },
      { type: "Jeep Rental (Per Day)", price: 45 },
    ],
  },
  {
    imageUrl:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/iStock_000058485880_XXXLarge.jpg",
    title: "Ganges River",
    location: "Varanasi, Uttar Pradesh",
    description:
      "Experience the spiritual heart of India along the sacred ghats of the ancient city.",
    rating: 4,
    price: 130,
    flights: [],
    hotels: [],
    cabs: [], // Placeholder data
  },
  {
    imageUrl:
      "https://imgcld.yatra.com/ytimages/image/upload/v1517480778/AdvNation/ANN_DES95/ann_top_Ladakh_buV00Q.jpg",
    title: "Jammu Kashmir",
    location: "Ladakh",
    description:
      "Experience the spiritual heart of India along the sacred ghats of the ancient city.",
    rating: 4,
    price: 130,
    flights: [],
    hotels: [],
    cabs: [], // Placeholder data
  },
];

// --- SVG ICONS (UNCHANGED) ---
const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    ></path>
  </svg>
);
const XIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400 dark:text-gray-500"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SearchIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${
      filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.445a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118l-3.367-2.445a1 1 0 00-1.175 0l-3.367 2.445c-.784.57-1.838-.197-1.539-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.073 9.383c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);
const PlaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1.5-1.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);
const BedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4v16h20V4Z" />
    <path d="M2 10h20" />
    <path d="M6 14v-2" />
    <path d="M18 14v-2" />
  </svg>
);
const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <path d="M7 17h10" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

// --- REFACTORED CORE COMPONENTS ---

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/deals", label: "Deals" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  
  // Define classes for NavLink for reusability
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white";
  };

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
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
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
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            className="bg-accent text-white text-xl px-8 py-3 rounded-full hover:bg-opacity-90"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-dark dark:bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              TravelCo India
            </h3>
            <p className="text-gray-400">
              Your gateway to unforgettable adventures across India.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/destinations" className="hover:text-accent transition-colors">Destinations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">
              Join Our Newsletter
            </h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md p-2 text-dark dark:text-gray-200 bg-gray-200 dark:bg-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent text-white font-bold px-4 rounded-r-md hover:bg-opacity-90"
              >
                Go
              </button>
            </form>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">FB</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">TW</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">IG</a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/20 py-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TravelCo India. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

// --- SHARED COMPONENTS (UNCHANGED) ---
function SearchBar() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [inputType, setInputType] = useState("text");
  const [searchResult, setSearchResult] = useState("");

  const handleDateFocus = () => setInputType("date");
  const handleDateBlur = () => !date && setInputType("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchData = { location, date, guests, rooms };
    console.log("Searching with:", searchData);
    const resultString = `Searching for: Location: ${location}, Date: ${date}, Guests: ${guests}, Rooms: ${rooms}`;
    setSearchResult(resultString);
    setTimeout(() => setSearchResult(""), 5000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200"
        >
          {/* Location */}
          <div className="flex items-center gap-3 p-4 w-full">
            <SearchIcon className="w-6 h-6 text-gray-500 shrink-0" />
            <div className="w-full">
              <label htmlFor="location" className="block text-xs font-semibold text-gray-700">
                Hotel
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where to?"
                className="w-full bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-500 text-gray-900"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 p-4 w-full">
            <CalendarIcon className="w-6 h-6 text-gray-500 shrink-0" />
            <div className="w-full">
              <label htmlFor="date" className="block text-xs font-semibold text-gray-700">
                Check-in/out
              </label>
              <input
                type={inputType}
                id="date"
                value={date}
                placeholder="Select dates"
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-500 text-gray-900"
                required
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="flex items-center gap-3 p-4 w-full">
            <UsersIcon className="w-6 h-6 text-gray-500 shrink-0" />
            <div className="w-full">
              <p className="block text-xs font-semibold text-gray-700">Guests and rooms</p>
              <p className="text-sm sm:text-base text-gray-900 font-semibold">{`${guests} Guests, ${rooms} Room`}</p>
            </div>
          </div>

          {/* Search Button */}
          <div className="p-4 w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center shadow-md">
          {searchResult}
        </div>
      )}
    </div>
  );
}

function DetailsModal({ destination, onClose }) {
  if (!destination) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {destination.title}
            </h2>
            <p className="text-gray-400">{destination.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XIcon />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <PlaneIcon /> Available Flights
            </h3>
            {destination.flights && destination.flights.length > 0 ? (
              <ul className="bg-gray-900/50 p-4 rounded-md divide-y divide-gray-700">
                {destination.flights.map((flight, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span className="text-gray-300">{flight.airline}</span>
                    <span className="font-bold text-accent">${flight.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 pl-4">No flight data available.</p>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <BedIcon /> Top Hotels
            </h3>
            {destination.hotels && destination.hotels.length > 0 ? (
              <ul className="bg-gray-900/50 p-4 rounded-md divide-y divide-gray-700">
                {destination.hotels.map((hotel, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="text-gray-300">{hotel.name}</p>
                      <div className="flex items-center">
                        <StarIcon filled={true} />{" "}
                        <span className="ml-1 text-xs text-yellow-400">
                          {hotel.rating}.0
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-accent">
                      ${hotel.price}{" "}
                      <span className="text-xs font-normal text-gray-400">/night</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 pl-4">No hotel data available.</p>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <CarIcon /> Local Cabs
            </h3>
            {destination.cabs && destination.cabs.length > 0 ? (
              <ul className="bg-gray-900/50 p-4 rounded-md divide-y divide-gray-700">
                {destination.cabs.map((cab, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span className="text-gray-300">{cab.type}</span>
                    <span className="font-bold text-accent">${cab.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 pl-4">No cab data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationCard({ destination, onCardClick }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      onClick={() => onCardClick(destination)}
    >
      <div className="relative">
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-accent text-white p-2 rounded-bl-lg font-bold">
          ${destination.price}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-primary">{destination.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {destination.location}
        </p>
        <p className="text-dark dark:text-gray-300 text-sm mb-4 h-10">
          {destination.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < destination.rating} />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              ({destination.rating}.0)
            </span>
          </div>
          <span className="text-primary font-semibold hover:underline">
            View Options →
          </span>
        </div>
      </div>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function Home() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section
        className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Explore Incredible India
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            From serene backwaters to majestic mountains, your Indian adventure starts here.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Featured Destinations
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Explore top-rated places picked by our travel experts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {indianDestinationsData.map((dest, index) => (
              <DestinationCard
                key={index}
                destination={dest}
                onCardClick={setSelectedDestination}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-dark dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p>Our team comprises passionate travelers who know the ins and outs of travel in India.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Curated Packages</h3>
              <p>We offer handpicked, all-inclusive packages so you can travel without any hassle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p>Our support team is available around the clock to assist you on your journey.</p>
            </div>
          </div>
        </div>
      </section>

      <DetailsModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </main>
  );
}

function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-white dark:bg-gray-800 py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About TravelCo India</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Welcome to TravelCo India, your trusted partner in exploring the rich tapestry of culture, landscapes, and heritage that India has to offer. We believe that travel is not just about visiting new places, but about creating lasting memories. Our mission is to provide you with authentic, seamless, and unforgettable travel experiences across this incredible nation.
        </p>
        <div className="border-t dark:border-gray-700 pt-10">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-dark dark:text-gray-300">
            <div className="p-6 rounded-lg"><h3 className="text-xl font-semibold mb-2">Authenticity</h3><p>We connect you with local experiences, ensuring you see the true heart of India.</p></div>
            <div className="p-6 rounded-lg"><h3 className="text-xl font-semibold mb-2">Quality</h3><p>From accommodations to guides, we ensure the highest standards for your comfort and safety.</p></div>
            <div className="p-6 rounded-lg"><h3 className="text-xl font-semibold mb-2">Responsibility</h3><p>We are committed to responsible tourism that respects local communities and environments.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const blogPosts = [
    { image: "https://images.unsplash.com/photo-1603291552140-aa7b2d56152a?q=80&w=600", title: "Top 10 Street Foods to Try in Delhi", excerpt: "Embark on a culinary journey through the bustling streets of Delhi and discover flavors that will delight your senses.", author: "Rohan Sharma", date: "October 15, 2025" },
    { image: "https://images.unsplash.com/photo-1621961671018-b26a6113b2e5?q=80&w=600", title: "A Guide to Houseboat Living in Kerala", excerpt: "Everything you need to know about experiencing the serene backwaters of Kerala on a traditional houseboat.", author: "Priya Menon", date: "October 10, 2025" },
    { image: "https://images.unsplash.com/photo-1607743285440-84c489814a7e?q=80&w=600", title: "Rajasthan on a Budget: A Backpacker’s Guide", excerpt: "Explore the land of kings without breaking the bank. Tips and tricks for an affordable royal adventure.", author: "Amit Singh", date: "October 5, 2025" },
  ];
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">Travel Stories</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Inspiration and tips for your next Indian adventure.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-primary mb-2">{post.title}</h3>
                <p className="text-dark dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400">By {post.author} on {post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AllDestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">Discover India</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Browse our curated list of must-visit destinations across the country.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {indianDestinationsData.map((dest, index) => (
            <DestinationCard
              key={index}
              destination={dest}
              onCardClick={setSelectedDestination}
            />
          ))}
        </div>
      </div>
      <DetailsModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
}

const PlaceholderPage = ({ title }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="container mx-auto p-16 text-center h-[50vh] flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      <p className="mt-4 text-dark dark:text-gray-300">
        Content for this page is coming soon!
      </p>
    </div>
  );
};

const Contact = () => <PlaceholderPage title="Contact Us" />;
const Profile = () => <PlaceholderPage title="User Profile" />;
const Deals = () => <PlaceholderPage title="Deals" />;

// --- NEW: ROOT LAYOUT COMPONENT ---
// This component wraps every page with the Header and Footer.
// The <Outlet /> component renders the active child route.
function RootLayout() {
  return (
    <div className="dark flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-800">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


// --- NEW ROUTER CONFIGURATION ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // The layout is the parent of all pages
    children: [
      {
        index: true, // This makes Home the default page for "/"
        element: <Home />,
      },
      {
        path: "destinations",
        element: <AllDestinationsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
    ],
  },
]);


// --- REFACTORED MAIN APP COMPONENT ---
export default function App() {
  return <RouterProvider router={router} />;
}