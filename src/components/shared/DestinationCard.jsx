import { StarIcon } from "./Icons";

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
          ₹{destination.price}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-primary text-white">{destination.title}</h3>
        <p className="text-sm dark:text-gray-500 mb-2">
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
          <span className="text-primary font-semibold hover:underline text-gray-400">
            View Options →
          </span>
        </div>
      </div>
    </div>
  );
}
export default DestinationCard;