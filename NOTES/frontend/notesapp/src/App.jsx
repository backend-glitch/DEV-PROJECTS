import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Landing from "./pages/Landing/Landing";
import NotFound from "./pages/notfound/notfound";

import ProtectedRoute from "./pages/protectedroutes/protectRoute";
import PublicRoute from "./pages/protectedroutes/publicRoute";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Routes>

       
        <Route path="/" element={<Landing />} />

       
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

     
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Toaster position="top-center" />
    </Router>
  );
};

export default App;