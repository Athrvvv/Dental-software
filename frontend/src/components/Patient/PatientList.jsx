import React, { useEffect, useState } from "react";
import api from "../../utils/api"; // Ensure this Axios instance is set up to hit your backend
import { useNavigate } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await api.get("/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatients(res.data.patients || []);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientClick = (id) => {
    navigate(`/patients/${id}`);
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        alert("User not logged in.");
        return;
      }

      const res = await api.post("/patients", newPatient, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatients((prev) => [...prev, res.data.patient]);
      setShowCreateModal(false);
      setNewPatient({ fullName: "", phone: "", age: "", gender: "" });
    } catch (err) {
      alert("Failed to create patient.");
      console.error("Create patient error:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Patients</h2>

      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <div
              key={patient._id}
              onClick={() => handlePatientClick(patient._id)}
              className="p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="text-lg font-bold">{patient.fullName}</h3>
              <p className="text-sm text-gray-600">Phone: {patient.phone}</p>
              <p className="text-sm text-gray-600">Age: {patient.age}</p>
              <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 transition"
      >
        + Add Patient
      </button>

      {/* Create Patient Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Patient</h3>
            <form onSubmit={handleCreatePatient} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={newPatient.fullName}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, fullName: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={newPatient.age}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, age: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <select
                value={newPatient.gender}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, gender: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
