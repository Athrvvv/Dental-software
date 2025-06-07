import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PatientList from "../components/Patient/PatientList"; // ✅ Import PatientList

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ✅ Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <PatientList />
          </PrivateRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
