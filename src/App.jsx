import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Profile from "./pages/Profile";
import Deals from "./pages/Deals";
import Blog from "./pages/Blogs"

// Router Configuration
const router = createBrowserRouter([
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}