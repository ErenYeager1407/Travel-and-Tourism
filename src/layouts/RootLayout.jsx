import { Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getCurrentUser } from "../lib/appwrite";

export default function RootLayout() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserSession = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser() ;
      setAuthUser(currentUser); // triggers Header re-render
    } catch (error) {
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  if (isLoading) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading your session...
        </p>

        {/* Optional subtext */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please wait while we set things up
        </p>
      </div>
    </div>
  );
}


  return (
    <div className="dark flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-800">
      <Header authUser={authUser} setAuthUser={setAuthUser} setIsLoading={setIsLoading} />
      <main className="flex-grow">
        <Outlet context={{ authUser, setAuthUser, setIsLoading}} />
      </main>
      <Footer />
    </div>
  );
}
