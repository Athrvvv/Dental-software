import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    else if (formData.fullName.length < 3) errs.fullName = 'Too short';

    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';

    if (!formData.phone) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) errs.phone = 'Enter a valid 10-digit number';

    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'At least 6 characters';

    if (formData.confirmPassword !== formData.password)
      errs.confirmPassword = 'Passwords do not match';

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    setLoading(true);
    try {
      const res = await api.post('/api/users/signup', formData);
      alert('✅ Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Form Section */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create your account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.fullName ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.phone ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'focus:ring-2 focus:ring-emerald-500'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>

      {/* Right Branding Section */}
      <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-4">Join Our Dental Platform</h1>
        <p className="text-lg mb-4 text-center">
          Manage your clinic, patients & billing in one place.
        </p>
        <p className="text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline text-white font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
