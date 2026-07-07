import { useState, useEffect } from "react";
import { SearchIcon } from "./Icons";

export default function SearchBar({ onSearch, value = "" }) {
  const [location, setLocation] = useState(value);

  useEffect(() => {
    setLocation(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocation(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(location);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-black/40 backdrop-blur-xl border border-white/10 dark:border-gray-800 rounded-full shadow-2xl p-1.5 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all duration-300"
      >
        {/* Search Icon */}
        <div className="pl-4 text-cyan-400 flex items-center justify-center">
          <SearchIcon className="w-5 h-5" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          id="location-search"
          value={location}
          onChange={handleChange}
          placeholder="Where to? (e.g., Goa, Manali, Kerala...)"
          className="flex-grow bg-transparent text-white placeholder-gray-400 pl-3 pr-4 py-3 text-base focus:outline-none"
          autoComplete="off"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/10 active:scale-95 flex items-center gap-2 cursor-pointer text-sm md:text-base flex-shrink-0"
        >
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

