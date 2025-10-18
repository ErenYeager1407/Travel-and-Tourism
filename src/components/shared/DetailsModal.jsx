import { XIcon, PlaneIcon, BedIcon, CarIcon, StarIcon } from "./Icons";

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

export default DetailsModal;