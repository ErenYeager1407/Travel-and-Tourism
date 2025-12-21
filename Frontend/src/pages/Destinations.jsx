import { useState, useEffect } from "react";
import DestinationCard from "../components/shared/DestinationCard";
import DetailsModal from "../components/shared/DetailsModal";
import { getDestinations } from "../lib/api";

export default function Destinations() {
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

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-4 text-white">
          Discover India
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Browse our curated list of must-visit destinations across the country.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, index) => (
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