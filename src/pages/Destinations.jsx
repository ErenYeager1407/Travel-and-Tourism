import { useState, useEffect } from "react";
import DestinationCard from "../components/shared/DestinationCard";
import DetailsModal from "../components/shared/DetailsModal";
import { indianDestinationsData } from "../data/destinations";

export default function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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