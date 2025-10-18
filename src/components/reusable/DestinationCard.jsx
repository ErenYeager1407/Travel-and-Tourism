// import React from 'react';

// export default function DestinationCard({ imageUrl, title, location, description, rating, price }) {
//   return (
//     <div className="bg-light rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300">
//       <div className="relative">
//         <img
//           src={imageUrl}
//           alt={title}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//         />
//         <div className="absolute top-0 right-0 bg-accent text-light p-2 rounded-bl-lg">
//           <span className="font-bold">${price}</span>
//           <span className="text-sm">/person</span>
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="text-xl font-bold text-primary">{title}</h3>
//         <p className="text-sm text-gray-500 mb-2">{location}</p>
//         <p className="text-dark text-sm mb-4">{description}</p>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {/* Replace with Star icons */}
//             <span className="text-yellow-500">{'★'.repeat(rating)}</span>
//             <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
//             <span className="text-sm text-gray-600 ml-2">({rating}.0)</span>
//           </div>
//           <a
//             href="#"
//             className="text-primary font-semibold hover:underline"
//           >
//             View Details →
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }