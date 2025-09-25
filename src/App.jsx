import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";
import SearchPage from "./pages/search";
import Favorites from "./pages/favorites";
import GifPage from "./pages/single-gif";
import GiffContext from "./context/GiffContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:category",
        element: <CategoryPage />,
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },
      {
        path: "/:type/:slug",
        element: <GifPage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const App = () => {
  return (
    <GiffContext>
      <RouterProvider router={router} />
    </GiffContext>
  );
};

export default App;
