import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    doctorName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.doctorName.trim()) {
      errs.doctorName = 'Doctor name is required';
    } else if (formData.doctorName.length < 3) {
      errs.doctorName = 'Doctor name must be at least 3 characters';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/users/login", {
        fullName: formData.doctorName,
        password: formData.password
      });

     localStorage.setItem("user", JSON.stringify(res.data.user));
api.defaults.headers.common["Authorization"] = `Bearer ${res.data.user.token}`;


      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ password: err.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section */}
      <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex items-center justify-center p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Simplifying Dental Practice</h1>
          <p className="text-lg">Enhance patient care. Manage your clinic efficiently.</p>
        </div>
      </div>

      {/* Right section */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome back, Doctor!</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-600">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  errors.doctorName ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.doctorName && (
                <p className="text-sm text-red-600 mt-1">{errors.doctorName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            New to the clinic?{" "}
            <Link to="/signup" className="text-emerald-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
