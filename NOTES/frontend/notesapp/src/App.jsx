import React from "react";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./pages/protectedroutes/protectRoute";
import PublicRoute from "./pages/protectedroutes/publicRoute";
import NotFound from "./pages/notfound/notfound";
import {Toaster, useToaster} from "react-hot-toast";


const App = () => {
  return (
    <Router>
    <Routes>

      {/* DEFAULT ROUTE */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
 
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

         <Route
         path="*"
         element={
          <NotFound />
         }
       />

       

    </Routes>


       <Toaster position="top-center" />

    </Router>

    
  );
};

export default App;