import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="dark flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-800">
      {/* HEADER IS NOW A SIBLING TO MAIN */}
      <Header />

      {/* MAIN ONLY WRAPS THE PAGE CONTENT (OUTLET) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER IS ALSO A SIBLING TO MAIN */}
      <Footer />
    </div>
  );
}