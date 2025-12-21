import { useState, useEffect } from "react";
import { getDestinations } from "../lib/api";
import { SearchBar, DestinationCard, DetailsModal } from "../components/index"

export default function Home() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main>
      <section
        className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center bg-cover bg-top"
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
          <h2 className="text-3xl font-bold text-center text-primary mb-2 text-white">
            Featured Destinations
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Explore top-rated places picked by our travel experts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                <p className="mt-2 text-gray-400">Loading destinations...</p>
              </div>
            ) : destinations.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-xl text-gray-400">No destinations available yet.</p>
                <p className="text-sm text-gray-500 mt-2">Check back soon or contact an admin to add destinations.</p>
              </div>
            ) : (
              destinations.map((dest, index) => (
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

      <section className="py-20 bg-white dark:bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-white font-bold text-primary mb-8">
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