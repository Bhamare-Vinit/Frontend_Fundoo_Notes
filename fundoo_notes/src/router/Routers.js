import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SwipeDrawer from "../components/SwipeDrawer";
import Notes from "../notes/Notes";
import Archived from "../notes/Archived";
import Trashed from "../notes/Trashed";
import AllNotes from "../notes/AllNotes";
// export default function Routers() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/* <Route path="/register" element={<Register />}></Route>
//         <Route path="/" element={<Login />}></Route> */}
//           <Route path="/register" element={<Register />}></Route>
//           <Route path="/" element={<Login />}></Route>
//           <Route path="/home" element={<Home />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "",
        element: <AllNotes />,
      },
      {
        path: "archive",
        element: <Archived />,
      },
      {
        path: "trash",
        element: <Trashed />,
      },
    ],
  },
]);

const RoutingModule = () => {
  return <RouterProvider router={AppRoutes} />;
};

export default RoutingModule;
