// import React, { useState } from 'react';

// // Using comments for icons, replace with an icon library like lucide-react
// // e.g., import { Menu, X } from 'lucide-react';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/destinations', label: 'Destinations' },
//     { href: '/deals', label: 'Deals' },
//     { href: '/blog', label: 'Blog' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ];

//   return (
//     <header className="bg-light/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
//       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <a href="/" className="text-2xl font-bold text-primary">
//           TravelCo
//         </a>

//         {/* Desktop Navigation */}
//         <ul className="hidden md:flex items-center space-x-6">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <a href={link.href} className="text-dark hover:text-primary transition-colors duration-300">
//                 {link.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Auth Buttons - Desktop */}
//         <div className="hidden md:flex items-center space-x-4">
//           <button className="text-dark hover:text-primary transition-colors duration-300">Login</button>
//           <button className="bg-accent text-light px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
//             Sign Up
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark focus:outline-none">
//             {/* Replace with Menu icon */}
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-light z-50 flex flex-col items-center pt-8">
//            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-6 text-dark">
//                 {/* Replace with X icon */}
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//            </button>
//           <ul className="flex flex-col items-center space-y-6 mt-12">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <a href={link.href} className="text-2xl text-dark hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//            <div className="mt-8 flex flex-col items-center space-y-4">
//               <button className="text-2xl text-dark hover:text-primary transition-colors duration-300">Login</button>
//               <button className="bg-accent text-light text-xl px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
//                 Sign Up
//               </button>
//             </div>
//         </div>
//       )}
//     </header>
//   );
// }