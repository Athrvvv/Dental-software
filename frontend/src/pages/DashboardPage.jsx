// frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidDashboard } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { MdMessage } from "react-icons/md";
import { GoFileSubmodule } from "react-icons/go";
import { FaNoteSticky } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const cards = [
    {
      label: "Dashboard",
      icon: <BiSolidDashboard />,
      color: "bg-blue-100",
      text: "text-blue-800",
    },
    {
      label: "Patients",
      icon: <IoPersonSharp />,
      color: "bg-yellow-100",
      text: "text-yellow-800",
    },
    {
      label: "Appointments",
      icon: <FaCalendarAlt />,
      color: "bg-red-100",
      text: "text-red-800",
    },
    {
      label: "Settings",
      icon: <IoMdSettings />,
      color: "bg-indigo-100",
      text: "text-indigo-800",
    },
    {
      label: "Reports",
      icon: <TbReportAnalytics />,
      color: "bg-orange-100",
      text: "text-orange-800",
    },
    {
      label: "Communication",
      icon: <MdMessage />,
      color: "bg-red-100",
      text: "text-red-800",
    },
    {
      label: "Files",
      icon: <GoFileSubmodule />,
      color: "bg-orange-100",
      text: "text-orange-800",
    },
    {
      label: "Lab Work",
      icon: <FaNoteSticky />,
      color: "bg-orange-100",
      text: "text-orange-800",
    },
  ];

  const handleCardClick = (label) => {
    if (label === "Patients") {
      navigate("/patients");
    } else if (label === "Dashboard") {
      navigate("/dashboard");
    }
    // Add other routes similarly as needed
  };

  if (loading)
    return <div className="p-10 text-center text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Top Navbar */}
      <div className="bg-white shadow-md px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-xl font-bold text-emerald-700">
          Shree Dental Clinic
        </h1>
        <div className="hidden md:flex gap-4 items-center">
          <span className="text-gray-700 font-medium">
            Welcome, Dr. {doctorName}
          </span>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-emerald-700"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 w-64"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-emerald-700">
                Hello, Dr. {doctorName}
              </h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-black text-lg"
              >
                <HiX />
              </button>
            </div>
            <button
              onClick={() => {
                setShowLogoutModal(true);
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Cards */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        {cards.map((item, idx) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={idx}
            onClick={() => handleCardClick(item.label)}
            className={`flex flex-col items-center justify-center gap-3 py-8 h-48 sm:h-56 rounded-xl shadow-md font-semibold text-lg cursor-pointer ${item.color} ${item.text}`}
          >
            <div className="text-4xl">{item.icon}</div>
            <div>{item.label}</div>
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>
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
