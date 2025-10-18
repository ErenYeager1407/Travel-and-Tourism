// import React from 'react';

// // Using comments for icons, replace with an icon library like lucide-react
// // e.g., import { MapPin, Calendar, Users, Search } from 'lucide-react';

// export default function SearchBar() {
//   return (
//     <div className="bg-light p-4 md:p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
//       <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
//         {/* Location Input */}
//         <div className="relative col-span-1 md:col-span-1">
//           <label htmlFor="location" className="block text-sm font-medium text-gray-500 mb-1">Location</label>
//           <div className="flex items-center">
//              {/* Icon: MapPin */}
//             <span className="absolute left-3 text-gray-400">📍</span>
//             <input
//               type="text"
//               id="location"
//               placeholder="Where are you going?"
//               className="w-full pl-10 p-3 border border-gray-200 rounded-md focus:ring-primary focus:border-primary"
//             />
//           </div>
//         </div>

//         {/* Date Input */}
//         <div className="relative col-span-1 md:col-span-1">
//           <label htmlFor="date" className="block text-sm font-medium text-gray-500 mb-1">Dates</label>
//            <div className="flex items-center">
//              {/* Icon: Calendar */}
//             <span className="absolute left-3 text-gray-400">📅</span>
//             <input
//               type="text"
//               id="date"
//               placeholder="Select dates"
//               onFocus={(e) => (e.target.type = 'date')}
//               onBlur={(e) => (e.target.type = 'text')}
//               className="w-full pl-10 p-3 border border-gray-200 rounded-md focus:ring-primary focus:border-primary"
//             />
//           </div>
//         </div>

//         {/* Guests Input */}
//         <div className="relative col-span-1 md:col-span-1">
//           <label htmlFor="guests" className="block text-sm font-medium text-gray-500 mb-1">Guests</label>
//           <div className="flex items-center">
//              {/* Icon: Users */}
//             <span className="absolute left-3 text-gray-400">👥</span>
//             <input
//               type="number"
//               id="guests"
//               placeholder="Number of guests"
//               min="1"
//               className="w-full pl-10 p-3 border border-gray-200 rounded-md focus:ring-primary focus:border-primary"
//             />
//           </div>
//         </div>

//         {/* Search Button */}
//         <button
//           type="submit"
//           className="col-span-1 md:col-span-1 bg-accent text-light font-bold p-3 rounded-md hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center h-full mt-2 md:mt-6"
//         >
//            {/* Icon: Search */}
//           <span className="mr-2">🔍</span>
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }