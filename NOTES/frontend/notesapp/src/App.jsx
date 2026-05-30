import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./pages/protectedroutes/protectRoute";
import PublicRoute from "./pages/protectedroutes/publicRoute";

const App = () => {
  return (
    <Routes>

      {/* DEFAULT ROUTE */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* SIGNUP */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;