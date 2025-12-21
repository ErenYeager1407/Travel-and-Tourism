import { useEffect } from "react";

function PlaceholderPage({ title }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-16 text-center h-[50vh] flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      <p className="mt-4 text-dark dark:text-gray-300">
        Content for this page is coming soon!
      </p>
    </div>
  );
}

export default PlaceholderPage;