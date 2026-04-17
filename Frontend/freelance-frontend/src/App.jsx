// App.jsx — Main router for SkillLink tutoring platform

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home      from "./pages/Home";
import Tutors    from "./pages/Tutors";
import Booking   from "./pages/Booking";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public pages */}
          <Route path="/"         element={<Home />} />
          <Route path="/tutors"   element={<Tutors />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected — must be logged in */}
          <Route path="/booking"   element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
              <div className="text-8xl font-bold text-brand-100 mb-4 animate-float">404</div>
              <p className="text-lg text-gray-400 mb-6">This page doesn't exist</p>
              <a href="/" className="bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-700 transition shadow-md">
                Go back home
              </a>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
