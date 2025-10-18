import { useEffect } from "react";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    { image: "https://images.unsplash.com/photo-1603291552140-aa7b2d56152a?q=80&w=600", title: "Top 10 Street Foods to Try in Delhi", excerpt: "Embark on a culinary journey through the bustling streets of Delhi and discover flavors that will delight your senses.", author: "Rohan Sharma", date: "October 15, 2025" },
    { image: "https://images.unsplash.com/photo-1621961671018-b26a6113b2e5?q=80&w=600", title: "A Guide to Houseboat Living in Kerala", excerpt: "Everything you need to know about experiencing the serene backwaters of Kerala on a traditional houseboat.", author: "Priya Menon", date: "October 10, 2025" },
    { image: "https://images.unsplash.com/photo-1607743285440-84c489814a7e?q=80&w=600", title: "Rajasthan on a Budget: A Backpacker’s Guide", excerpt: "Explore the land of kings without breaking the bank. Tips and tricks for an affordable royal adventure.", author: "Amit Singh", date: "October 5, 2025" },
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">Travel Stories</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Inspiration and tips for your next Indian adventure.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-primary mb-2">{post.title}</h3>
                <p className="text-dark dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400">By {post.author} on {post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}