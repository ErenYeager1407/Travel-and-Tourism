import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About TravelCo India</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Welcome to TravelCo India, your trusted partner in exploring the rich tapestry of culture, landscapes, and heritage that India has to offer. We believe that travel is not just about visiting new places, but about creating lasting memories. Our mission is to provide you with authentic, seamless, and unforgettable travel experiences across this incredible nation.
        </p>
        <div className="border-t dark:border-gray-700 pt-10">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-dark dark:text-gray-300">
            <div className="p-6 rounded-lg"><h3 className="text-xl font-semibold mb-2">Authenticity</h3><p>We connect you with local experiences, ensuring you see the true heart of India.</p></div>
            <div className="p-6 rounded-lg"><h3 className="text-xl font-semibold mb-2">Quality</h3><p>From accommodations to guides, we ensure the highest standards for your comfort and safety.</p></div>
            <div className="p-6 rounded-lg"><h3 className="text-xl font-semibold mb-2">Responsibility</h3><p>We are committed to responsible tourism that respects local communities and environments.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}