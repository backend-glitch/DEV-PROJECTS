import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/notfound/notfound";
// import Home from "./pages/Home";

import ProtectedRoute from "./pages/proutes/ProtectedRoute";
import PublicRoute from "./pages/proutes/PublicRoute";

import { Toaster } from "react-hot-toast";
// import Monthly from "./pages/sections/monthly";
// import Yearly from "./pages/sections/Yearly";
import FullScreenLoader from "./pages/loading/Loading";
import JournalPage from "./pages/journalPage/JournalPage";


const Weekly = lazy(() => import("./pages/sections/Weekly"));
const Monthly = lazy(() => import("./pages/sections/Monthly"));
const Yearly = lazy(() => import("./pages/sections/Yearly"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
     
      <Suspense fallback={<FullScreenLoader />}> 
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
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
                <Signup />
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
            path="/weekly"
            element={
              <ProtectedRoute>
                <Weekly />
              </ProtectedRoute>
            }
          />

          <Route
            path="/monthly"
            element={
              <ProtectedRoute>
                <Monthly />
              </ProtectedRoute>
            }
          />

          <Route
            path="/yearly"
            element={
              <ProtectedRoute>
                <Yearly />
              </ProtectedRoute>
            }
          />

       <Route
            path="/Log"
            element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            }
          />


      
          <Route path="*" element={<NotFound />} />
        </Routes>    
      </Suspense>

    
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
