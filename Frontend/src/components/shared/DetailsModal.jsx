import { useRef, useState, useEffect } from "react";
import { XIcon, PlaneIcon, BedIcon, CarIcon, StarIcon } from "./Icons";
import { createBooking, getCurrentUser } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import toast from 'react-hot-toast';
import Map from '../Map';

function DetailsModal({ destination, onClose }) {
  if (!destination) return null;
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingItem, setBookingItem] = useState(null);
  const [bookingType, setBookingType] = useState(null);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    guests: 2,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]
  });

  // Fetch user bookings when modal opens
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        if (user && user.role !== 'ADMIN') {
          const response = await api.get('/bookings/my');
          setUserBookings(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, [destination]);

  // Check if a flight or hotel is already booked (exclude completed ones)
  const isBooked = (type, itemId) => {
    return userBookings.some(booking => {
      // Exclude completed bookings
      if (booking.status === 'COMPLETED') return false;

      if (type === 'flight' && booking.flight) {
        return booking.flight._id === itemId || booking.flight === itemId;
      }
      if (type === 'hotel' && booking.hotel) {
        return booking.hotel._id === itemId || booking.hotel === itemId;
      }
      return false;
    });
  };

  const handleBookClick = async (type, item) => {
    const user = await getCurrentUser();
    if (!user) {
      toast.error("Please login to book!");
      navigate("/login");
      return;
    }

    // Check if already booked
    if (isBooked(type, item._id)) {
      toast.error("You have already booked this item!");
      return;
    }

    // Show booking form
    setBookingItem(item);
    setBookingType(type);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = async () => {
    if (!bookingItem || !bookingType) return;

    const numberOfDays = Math.ceil((new Date(bookingForm.endDate) - new Date(bookingForm.startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = bookingType === 'hotel'
      ? bookingItem.pricePerNight * numberOfDays
      : bookingItem.price * bookingForm.guests;

    const bookingData = {
      destination: destination._id,
      [bookingType]: bookingItem._id,
      startDate: new Date(bookingForm.startDate).toISOString(),
      endDate: new Date(bookingForm.endDate).toISOString(),
      guests: Number(bookingForm.guests),
      totalPrice: totalPrice,
    };

    try {
      await createBooking(bookingData);
      toast.success(`Booking confirmed for ${bookingType === 'hotel' ? bookingItem.name : bookingItem.airline}!`);
      // Refresh bookings
      const response = await api.get('/bookings/my');
      setUserBookings(response.data);
      // Reset form and close
      setShowBookingForm(false);
      setBookingItem(null);
      setBookingType(null);
      setBookingForm({
        guests: 2,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]
      });
    } catch (error) {
      toast.error("Booking failed: " + error.message);
    }
  };

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
            <h2 className="text-2xl font-bold text-primary text-white">
              {destination.name || destination.title}
            </h2>
            <p className="text-gray-400">
              {destination.city && destination.state
                ? `${destination.city}, ${destination.state}`
                : destination.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {destination.coordinates && destination.coordinates.length === 2 && (
          <div className="px-6 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Where you will at</h3>
            <Map 
              coordinates={destination.coordinates} 
              locationName={destination.city && destination.state ? `${destination.city}, ${destination.state}` : destination.location || destination.title || destination.name} 
            />
          </div>
        )}

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="p-6 bg-gray-700 border-b border-gray-600">
            <h3 className="text-xl font-bold text-white mb-4">
              Complete Your Booking - {bookingType === 'hotel' ? bookingItem.name : bookingItem.airline}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  value={bookingForm.guests}
                  onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={bookingForm.startDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  value={bookingForm.endDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                />
              </div>
              <div className="col-span-2 flex gap-3">
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setBookingItem(null);
                    setBookingType(null);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <PlaneIcon /> Available Flights
            </h3>
            {destination.flights && destination.flights.length > 0 ? (
              <ul className="bg-gray-900/50 p-4 rounded-md divide-y divide-gray-700">
                {destination.flights.map((flight, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-300">{flight.airline}</span>
                      <span className="text-xs text-gray-500 ml-2">({flight.seats || 180} seats)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-accent text-white">₹{flight.price}</span>
                      {currentUser && currentUser.role !== 'ADMIN' && (
                        isBooked('flight', flight._id) ? (
                          <button
                            disabled
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
                          >
                            Booked
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBookClick('flight', flight)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Book
                          </button>
                        )
                      )}
                    </div>
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
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <StarIcon filled={true} />{" "}
                          <span className="ml-1 text-xs text-yellow-400">
                            {hotel.rating}.0
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">({hotel.rooms || 50} rooms)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-accent text-white">
                        ₹{hotel.pricePerNight}{" "}
                        <span className="text-xs font-normal text-white">/night</span>
                      </span>
                      {currentUser && currentUser.role !== 'ADMIN' && (
                        isBooked('hotel', hotel._id) ? (
                          <button
                            disabled
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
                          >
                            Booked
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBookClick('hotel', hotel)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Book
                          </button>
                        )
                      )}
                    </div>
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
                    <span className="font-bold text-accent text-white">₹{cab.price}</span>
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