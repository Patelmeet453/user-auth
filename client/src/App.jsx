import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import api from "./services/api";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => {});
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/profile" /> : <Register />}
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
