import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark dark:bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              TravelCo India
            </h3>
            <p className="text-gray-400">
              Your gateway to unforgettable adventures across India.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/destinations" className="hover:text-accent transition-colors">Destinations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">
              Join Our Newsletter
            </h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md p-2 text-dark dark:text-gray-200 bg-gray-200 dark:bg-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent text-white font-bold px-4 rounded-r-md hover:bg-opacity-90"
              >
                Go
              </button>
            </form>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">FB</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">TW</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">IG</a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/20 py-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TravelCo India. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}