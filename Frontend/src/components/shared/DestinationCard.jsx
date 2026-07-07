import { StarIcon } from "./Icons";

function DestinationCard({ destination, onCardClick }) {
  // Map backend schema to component props
  const imageUrl = destination.images && destination.images.length > 0
    ? destination.images[0]
    : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
  const title = destination.name || destination.title;
  const location = destination.city && destination.state
    ? `${destination.city}, ${destination.state}`
    : destination.location;
  const price = destination.estimatedTripCost || destination.basePrice || destination.price;
  const rating = destination.rating || 4;
  const description = destination.description || '';

  return (
    <div
      className="bg-gray-900/60 hover:bg-gray-900 border border-white/5 hover:border-cyan-500/30 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5 overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      onClick={() => onCardClick(destination)}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Floating Price Pill */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border border-white/10">
          ₹{price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>
        <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed font-light">
          {description}
        </p>
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-2 font-medium">
              ({rating}.0)
            </span>
          </div>
          <span className="text-cyan-400 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
            View Details <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default DestinationCard;