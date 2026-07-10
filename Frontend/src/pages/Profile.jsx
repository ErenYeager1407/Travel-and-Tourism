import { useState, useEffect, useCallback } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { PlaneIcon, BedIcon, CalendarIcon, UsersIcon, StarIcon } from "../components/shared/Icons";
import toast from "react-hot-toast";

export default function Profile() {
  const { authUser } = useOutletContext();
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all", "flights", "hotels"

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authUser) {
      toast.error("Please login to access your dashboard!");
      navigate("/login");
    }
  }, [authUser, navigate]);

  // Fetch user bookings
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/my");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      fetchBookings();
    }
  }, [authUser, fetchBookings]);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Stats calculation
  const flightBookings = bookings.filter((b) => b.flight);
  const hotelBookings = bookings.filter((b) => b.hotel);
  
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Tab filtering
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "flights") return booking.flight;
    if (activeTab === "hotels") return booking.hotel;
    return true;
  });

  if (!authUser) {
    return null; // Redirect logic will handle this
  }

  return (
    <div className="min-h-screen bg-gray-550 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* User Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600/90 to-blue-700/90 dark:from-cyan-950/40 dark:to-blue-950/40 border border-white/10 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md mb-8">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Avatar & User Details */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-cyan-500/20 border border-white/20">
                {authUser?.name ? authUser.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <span className="bg-cyan-500/20 text-cyan-200 dark:text-cyan-300 border border-cyan-500/30 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {authUser?.role || "Traveler"}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 leading-tight">
                  {authUser?.name}
                </h1>
                <p className="text-cyan-100/80 dark:text-gray-400 text-sm mt-0.5 font-medium">
                  {authUser?.email}
                </p>
              </div>
            </div>

            {/* Travel Stats Widget */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-black/20 dark:bg-gray-900/60 p-4 rounded-2xl border border-white/5 shadow-inner">
              <div className="text-center px-1 sm:px-3">
                <span className="block text-xl sm:text-2xl font-black text-white">
                  {bookings.length}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-300 dark:text-gray-400 font-semibold uppercase tracking-wider">
                  Total Bookings
                </span>
              </div>
              <div className="text-center px-1 sm:px-3 border-x border-white/10 dark:border-gray-800">
                <span className="block text-xl sm:text-2xl font-black text-white">
                  {flightBookings.length}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-300 dark:text-gray-400 font-semibold uppercase tracking-wider">
                  ✈️ Flights
                </span>
              </div>
              <div className="text-center px-1 sm:px-3">
                <span className="block text-xl sm:text-2xl font-black text-white">
                  {hotelBookings.length}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-300 dark:text-gray-400 font-semibold uppercase tracking-wider">
                  🏨 Hotels
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex bg-gray-200 dark:bg-gray-800/80 p-1.5 rounded-xl border border-gray-300/40 dark:border-gray-700/50 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab("flights")}
              className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "flights"
                  ? "bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="scale-90">✈️</span> Flights
            </button>
            <button
              onClick={() => setActiveTab("hotels")}
              className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "hotels"
                  ? "bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="scale-90">🏨</span> Hotels
            </button>
          </div>
          
          <Link
            to="/destinations"
            className="w-full sm:w-auto text-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5 duration-200"
          >
            Explore & Book More Trails
          </Link>
        </div>

        {/* Loading / Skeletal State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800/40 border dark:border-gray-800 rounded-2xl p-5 space-y-4">
                <div className="h-44 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800/60 rounded-3xl p-12 text-center shadow-xl flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-cyan-100 dark:bg-cyan-950/40 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce">
              🗺️
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              No Bookings Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              {activeTab === "all"
                ? "You haven't booked any flights or hotels yet. Your booked adventures will show up right here!"
                : activeTab === "flights"
                ? "You don't have any flight bookings yet. Check out our trail recommendations to plan a trip!"
                : "You don't have any hotel stays booked yet. Browse our top offbeat hotels!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/recommendations"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all"
              >
                Get Recommendations 🧭
              </Link>
              <Link
                to="/destinations"
                className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-750 dark:text-gray-300 font-bold text-xs px-5 py-3 rounded-xl transition-all"
              >
                Browse All Destinations
              </Link>
            </div>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => {
              const isFlight = !!booking.flight;
              const destination = booking.destination;
              const title = destination?.name || "Unknown Destination";
              const location = destination?.city && destination?.state
                ? `${destination.city}, ${destination.state}`
                : destination?.state || "India";
              const image = destination?.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
              
              // Status Styling
              let statusBg = "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/40";
              if (booking.status === "CANCELLED") {
                statusBg = "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/40";
              } else if (booking.status === "COMPLETED") {
                statusBg = "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/40";
              }

              return (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/2 transition-all duration-300 flex flex-col"
                >
                  {/* Card Banner Image */}
                  <div className="h-44 relative overflow-hidden group">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent"></div>
                    
                    {/* Badge representing booking type */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase">
                      {isFlight ? (
                        <>
                          <span className="scale-75 text-cyan-400">✈️</span> Flight Ticket
                        </>
                      ) : (
                        <>
                          <span className="scale-75 text-amber-400">🏨</span> Hotel Booking
                        </>
                      )}
                    </div>

                    {/* Badge representing status */}
                    <div className={`absolute top-4 right-4 text-[10px] font-extrabold px-3 py-1.5 border rounded-lg flex items-center gap-1.5 shadow-sm uppercase ${statusBg}`}>
                      {booking.status === "CONFIRMED" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-ping"></span>
                      )}
                      {booking.status}
                    </div>

                    {/* Destination Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] text-cyan-300 dark:text-cyan-400 uppercase tracking-widest font-extrabold">
                        {location}
                      </span>
                      <h3 className="text-xl font-black text-white mt-0.5 leading-tight">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    {isFlight ? (
                      /* Flight Booking Content */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b dark:border-gray-800 pb-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Airline</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                            <span className="text-lg">🛫</span> {booking.flight?.airline || "Air Express"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                              Flight Date
                            </span>
                            <span className="text-xs font-bold text-gray-850 dark:text-gray-200 flex items-center gap-1 mt-1">
                              <CalendarIcon className="w-3.5 h-3.5 text-cyan-500" />
                              {formatDate(booking.flightDate)}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                              Passengers
                            </span>
                            <span className="text-xs font-bold text-gray-850 dark:text-gray-200 flex items-center gap-1 mt-1">
                              <UsersIcon className="w-3.5 h-3.5 text-cyan-500" />
                              {booking.passengers} Traveler{booking.passengers > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t dark:border-gray-800 pt-2">
                          <div>
                            <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                              Departure Time
                            </span>
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-300 mt-1 block">
                              ⏰ {booking.flight?.startTime || "08:00 AM"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                              Flight Duration
                            </span>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 block">
                              ⏳ {booking.flight?.duration || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Hotel Booking Content */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b dark:border-gray-800 pb-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Hotel Stay</span>
                          <div className="text-right">
                            <span className="text-sm font-bold text-gray-900 dark:text-white block">
                              🏨 {booking.hotel?.name || "Premium Resort"}
                            </span>
                            {booking.hotel?.rating && (
                              <div className="flex items-center justify-end mt-0.5 gap-0.5">
                                <StarIcon filled={true} />
                                <span className="text-[10px] text-yellow-500 font-extrabold">
                                  {booking.hotel.rating}.0
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                              Check-In Date
                            </span>
                            <span className="text-xs font-bold text-gray-850 dark:text-gray-200 flex items-center gap-1 mt-1">
                              <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                              {formatDate(booking.startDate)}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                              Check-Out Date
                            </span>
                            <span className="text-xs font-bold text-gray-850 dark:text-gray-200 flex items-center gap-1 mt-1">
                              <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                              {formatDate(booking.endDate)}
                            </span>
                          </div>
                        </div>
                        <div className="border-t dark:border-gray-800 pt-2">
                          <span className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                            Guests
                          </span>
                          <span className="text-xs font-bold text-gray-855 dark:text-gray-200 flex items-center gap-1 mt-1">
                            <UsersIcon className="w-3.5 h-3.5 text-amber-500" />
                            {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Price and Action Footer */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                      <div>
                        <span className="block text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-extrabold">
                          Total Paid
                        </span>
                        <span className="text-lg font-black text-gray-900 dark:text-white">
                          ₹{booking.totalPrice?.toLocaleString("en-IN") || "0"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 block">
                          Booked on
                        </span>
                        <span className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold">
                          {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}