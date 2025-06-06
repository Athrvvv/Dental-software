import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.fullName) {
        navigate("/login");
      } else {
        setDoctorName(user.fullName);
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    setTimeout(() => navigate("/login"), 300);
  };

  if (loading) return <div className="p-10 text-center text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">Shree Dental Clinic</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium hidden sm:block">
            Welcome, Dr. {doctorName}
          </p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[
          { label: "Dashboard", color: "bg-blue-100", text: "text-blue-800" },
          { label: "Patients", color: "bg-yellow-100", text: "text-yellow-800" },
          { label: "Appointments", color: "bg-red-100", text: "text-red-800" },
          { label: "Settings", color: "bg-indigo-100", text: "text-indigo-800" },
          { label: "Reports", color: "bg-orange-100", text: "text-orange-800" },
          { label: "Communication", color: "bg-red-100", text: "text-red-800" },
          { label: "Files", color: "bg-orange-100", text: "text-orange-800" },
          { label: "Lab Work", color: "bg-orange-100", text: "text-orange-800" },
        ].map((item, idx) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={idx}
            className={`rounded-lg p-6 shadow-md flex items-center justify-center text-center font-semibold text-lg cursor-pointer ${item.color} ${item.text}`}
          >
            {item.label}
          </motion.div>
        ))}
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
