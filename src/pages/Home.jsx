// import React from 'react';
// import SearchBar from '../components/shared/SearchBar';
// import DestinationCard from '../components/shared/DestinationCard';

// // Mock data for featured destinations
// const featuredDestinations = [
//   {
//     imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2070',
//     title: 'Eiffel Tower',
//     location: 'Paris, France',
//     description: 'Experience the romantic charm and iconic landmarks of the City of Light.',
//     rating: 5,
//     price: 350,
//   },
//   {
//     imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070',
//     title: 'Shibuya Crossing',
//     location: 'Tokyo, Japan',
//     description: 'Dive into the vibrant, futuristic metropolis of Tokyo, a city of contrasts.',
//     rating: 4,
//     price: 420,
//   },
//   {
//     imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=2076',
//     title: 'Santorini Hills',
//     location: 'Santorini, Greece',
//     description: 'Relax on the stunning white-washed cliffs overlooking the Aegean Sea.',
//     rating: 5,
//     price: 280,
//   },
// ];


// export default function Home() {
//   return (
//     <main>
//       {/* Hero Section */}
//       <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-hero-pattern bg-cover bg-center">
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="relative z-10 px-4">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-light mb-4">
//             Find Your Next Adventure
//           </h1>
//           <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto">
//             Discover amazing places at exclusive prices. Your dream vacation is just a search away.
//           </p>
//           <SearchBar />
//         </div>
//       </section>

//       {/* Featured Destinations Section */}
//       <section className="py-16 bg-secondary">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-primary mb-2">
//             Featured Destinations
//           </h2>
//           <p className="text-center text-gray-600 mb-10">
//             Explore top-rated places picked by our travel experts.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredDestinations.map((dest, index) => (
//               <DestinationCard key={index} {...dest} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Other sections can be added here (Why Choose Us, Testimonials, etc.) */}
//       <section className="py-16 bg-light text-center">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-primary mb-8">Why Choose Us?</h2>
//           {/* Placeholder for Value Props */}
//           <div className="text-dark">Value propositions coming soon...</div>
//         </div>
//       </section>
//     </main>
//   );
// }