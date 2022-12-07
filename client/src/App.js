import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Leftbar from "./components/leftbar/Leftbar";
import Navbar from "./components/navbar/Navbar";
import Rightbar from "./components/rightbar/Rightbar";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

// temporary data
const currentUser = {
  id: "1",
  name: "Jane Doe",
  profilePic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4Muy_Z2IIkQznvhyZkrn-NWsnURAlW1Nq-xK4AE&s",
};

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <Outlet />
        <Rightbar />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: currentUser ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "/register",
    element: currentUser ? <Navigate to="/" /> : <Register />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
