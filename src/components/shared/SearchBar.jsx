import { useState, useEffect, useRef } from "react";
import { SearchIcon, CalendarIcon, UsersIcon } from "./Icons";

// --- GUEST POPUP COMPONENT (CORRECTED) ---
function GuestPopup({ guests, setGuests, rooms, setRooms, onClose }) {
  return (
    <div className="absolute top-full mt-2 w-72 origin-top-right rounded-xl bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="space-y-4">
        {/* Guests Counter */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">Guests</p>
            <p className="text-sm text-gray-500">Number of adults</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests(prev => Math.max(1, prev - 1))}
              disabled={guests <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-500 disabled:opacity-50"
            >
              -
            </button>
            {/* FIX: Added text-gray-700 to the number */}
            <span className="w-4 text-center font-semibold text-gray-700">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests(prev => prev + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-500"
            >
              +
            </button>
          </div>
        </div>

        {/* Rooms Counter */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">Rooms</p>
            <p className="text-sm text-gray-500">Number of rooms</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRooms(prev => Math.max(1, prev - 1))}
              disabled={rooms <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-500 disabled:opacity-50"
            >
              -
            </button>
            {/* FIX: Added text-gray-700 to the number */}
            <span className="w-4 text-center font-semibold text-gray-700">{rooms}</span>
            <button
              type="button"
              onClick={() => setRooms(prev => prev + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-500"
            >
              +
            </button>
          </div>
        </div>
      </div>
       <button 
          onClick={onClose} 
          className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
        >
          Done
        </button>
    </div>
  );
}


// --- MODIFIED SEARCHBAR COMPONENT ---
export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [inputType, setInputType] = useState("text");
  const [searchResult, setSearchResult] = useState("");
  
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const handleDateFocus = () => setInputType("date");
  const handleDateBlur = () => !date && setInputType("text");

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsGuestPopupOpen(false);
      }
    }
    if (isGuestPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGuestPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGuestPopupOpen(false);
    const searchData = { location, date, guests, rooms };
    console.log("Searching with:", searchData);
    const resultString = `Searching for: Location: ${location}, Date: ${date}, Guests: ${guests}, Rooms: ${rooms}`;
    setSearchResult(resultString);

    setTimeout(() => setSearchResult(""), 5000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-2xl sm:rounded-full shadow-lg p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center w-full"
        >
          {/* Location Section */}
          <div className="flex-1 w-full cursor-pointer rounded-full hover:bg-gray-100 p-2 sm:p-0 sm:pl-6 transition-colors duration-200">
            <label htmlFor="location" className="block text-xs font-bold text-gray-700">Hotel</label>
            <input
              type="text" id="location" value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-500 text-gray-900"
              required
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

          {/* Date Section */}
          <div className="flex-1 w-full cursor-pointer rounded-full hover:bg-gray-100 p-2 sm:p-0 sm:pl-6 transition-colors duration-200">
            <label htmlFor="date" className="block text-xs font-bold text-gray-700">Check-in/out</label>
            <input
              type={inputType} id="date" value={date}
              placeholder="Select dates" onFocus={handleDateFocus}
              onBlur={handleDateBlur} onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-500 text-gray-900"
              required
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

          {/* Guests & Search Button Section */}
          <div className="relative flex-1 w-full flex items-center justify-between rounded-full hover:bg-gray-100 p-2 sm:p-0 sm:pl-6 transition-colors duration-200" ref={popupRef}>
            <div onClick={() => setIsGuestPopupOpen(!isGuestPopupOpen)} className="w-full cursor-pointer">
              <p className="block text-xs font-bold text-gray-700">Guests & Rooms</p>
              <p className="text-sm text-gray-500 font-semibold">{`${guests} Guests, ${rooms} Room${rooms > 1 ? "s" : ""}`}</p>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center shadow-md hover:bg-blue-700 hover:shadow-lg w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 sm:mr-2"
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            
            {isGuestPopupOpen && (
              <GuestPopup
                guests={guests}
                setGuests={setGuests}
                rooms={rooms}
                setRooms={setRooms}
                onClose={() => setIsGuestPopupOpen(false)}
              />
            )}
          </div>
        </form>
      </div>

      {searchResult && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center shadow-md transition-opacity duration-300">
          {searchResult}
        </div>
      )}
    </div>
  );
}