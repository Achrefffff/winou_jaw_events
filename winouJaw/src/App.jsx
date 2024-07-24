import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { TimerProvider } from "./context/TimerContext";
import TimerDisplay from "./pages/timer/TimerDisplay";

function App() {
  return (
    <TimerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/zeb" element={<TimerDisplay />} />
          
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </TimerProvider>
  );
}

export default App;
