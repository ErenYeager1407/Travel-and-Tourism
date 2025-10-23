import { Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getCurrentUser } from "../lib/appwrite";

export default function RootLayout() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserSession = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
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
    return <div>Loading your session...</div>;
  }

  return (
    <div className="dark flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-800">
      <Header authUser={authUser} setAuthUser={setAuthUser} />
      <main className="flex-grow">
        <Outlet context={{ authUser, setAuthUser }} />
      </main>
      <Footer />
    </div>
  );
}
