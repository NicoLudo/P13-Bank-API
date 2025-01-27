import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/authSlice";

import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
