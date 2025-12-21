import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import RootLayout from "./layouts/RootLayout";
import { Home, Destinations, About, Contact, Profile, Deals, Blog, Signup, Login, AdminDashboard } from "./pages/index"

// Router Configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "destinations", element: <Destinations /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
      { path: "deals", element: <Deals /> },
      { path: "blog", element: <Blog /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}