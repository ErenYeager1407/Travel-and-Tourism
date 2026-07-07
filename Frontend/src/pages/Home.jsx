import { useState, useEffect } from "react";
import { getDestinations } from "../lib/api";
import { SearchBar, DestinationCard, DetailsModal } from "../components/index"

export default function Home() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const trendingTags = ["Goa", "Manali", "Kerala", "Rajasthan", "Agra"];
  const categories = ["All", "Mountains", "Beach", "Heritage", "Wildlife", "Adventure"];

  // Robust comparison helper for singular/plural differences (e.g. Mountain vs Mountains, Beach vs Beaches)
  const isTextMatch = (str1, str2) => {
    if (!str1 || !str2) return false;
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    if (s1.includes(s2) || s2.includes(s1)) return true;
    
    const clean = (s) => {
      if (s.endsWith('ies')) return s.slice(0, -3) + 'y';
      if (s.endsWith('es')) return s.slice(0, -2);
      if (s.endsWith('s')) return s.slice(0, -1);
      return s;
    };
    const clean1 = clean(s1);
    const clean2 = clean(s2);
    return clean1.includes(clean2) || clean2.includes(clean1);
  };

  const filteredDestinations = destinations.filter((dest) => {
    // 1. Filter by Search Query
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      
      const inName = dest.name && dest.name.toLowerCase().includes(query);
      const inCity = dest.city && dest.city.toLowerCase().includes(query);
      const inState = dest.state && dest.state.toLowerCase().includes(query);
      
      const inTags = dest.tags && dest.tags.some(tag => tag.toLowerCase().includes(query));
      const inActivities = dest.activities && dest.activities.some(act => act.toLowerCase().includes(query));
      const inDescription = dest.description && dest.description.toLowerCase().includes(query);

      matchesSearch = inName || inCity || inState || inTags || inActivities || inDescription;
    }

    // 2. Filter by Category Tab
    let matchesCategory = true;
    if (activeCategory !== "All") {
      const cat = activeCategory;
      
      const inTags = dest.tags && dest.tags.some(tag => isTextMatch(tag, cat));
      const inActivities = dest.activities && dest.activities.some(act => isTextMatch(act, cat));
      const inDescription = dest.description && isTextMatch(dest.description, cat);
      const inName = dest.name && isTextMatch(dest.name, cat);

      matchesCategory = inTags || inActivities || inDescription || inName;
    }

    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchQuery(""); // Clear text search to show all results in this category
  };

  return (
    <main className="bg-gray-950 min-h-screen text-white">
      {/* Hero Section */}
      <section
        className="relative h-[75vh] md:h-[90vh] flex items-center justify-center text-center bg-cover bg-top"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200')" }}
      >
        {/* Color Grading & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-gray-950"></div>
        
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span>✨ Discover the Spirit of India</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none drop-shadow-lg">
            Explore the Soul of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Incredible India</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            From serene backwaters and snowy peaks to historic forts and golden beaches. Your next adventure starts here.
          </p>

          <SearchBar onSearch={setSearchQuery} value={searchQuery} />

          {/* Trending Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 text-sm text-gray-300">
            <span className="font-medium text-gray-400">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 cursor-pointer active:scale-95 text-xs md:text-sm backdrop-blur-md font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 bg-gray-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">📍 Top Picked Tours</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4">
              Featured Destinations
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Explore handpicked destinations, carefully curated by our travel experts for an unforgettable getaway.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center items-center overflow-x-auto pb-4 mb-12 -mx-6 px-6 scrollbar-hide">
            <div className="flex space-x-2 bg-gray-900/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 text-xs md:text-sm cursor-pointer whitespace-nowrap active:scale-95 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-20 flex flex-col items-center justify-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent mb-4"></div>
                <p className="text-gray-400">Loading destinations...</p>
              </div>
            ) : destinations.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-gray-900/40 rounded-3xl border border-white/5">
                <p className="text-xl text-gray-400 font-semibold">No destinations available yet.</p>
                <p className="text-sm text-gray-500 mt-2">Check back soon or contact an admin to add destinations.</p>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-gray-900/40 rounded-3xl border border-white/5">
                <p className="text-xl text-gray-400 font-semibold">No destinations found matching "{searchQuery}" in {activeCategory}.</p>
                <p className="text-sm text-gray-500 mt-2">Try searching for a different keyword or switching categories.</p>
              </div>
            ) : (
              filteredDestinations.map((dest, index) => (
                <DestinationCard
                  key={dest._id || index}
                  destination={dest}
                  onCardClick={setSelectedDestination}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">🛡️ Our Promise</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              Why Choose IndiTrails?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-gray-950/50 rounded-3xl border border-white/5 hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Local Expertise</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team comprises passionate local travelers who know the ins and outs of every hidden gem in India.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-gray-950/50 rounded-3xl border border-white/5 hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Curated Packages</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We offer handpicked, all-inclusive packages designed to give you a seamless travel experience without any hassle.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-gray-950/50 rounded-3xl border border-white/5 hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">24/7 Support</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our dedicated support team is active around the clock, ready to assist you at every single step of your journey.
              </p>
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