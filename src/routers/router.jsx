import {
    createBrowserRouter,
  } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AnimeSection from "../pages/AnimeSection";


const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
          path: "/",
          Component: Home
        },
        {
          path: "/anime",
          Component: AnimeSection
        }
      ]
    },
  ]);

export default router;