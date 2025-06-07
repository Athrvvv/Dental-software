// backend/models/Patient.js
const { ObjectId } = require("mongodb");

const PatientSchema = {
  doctorId: ObjectId,
  fullName: String,
  phone: String,
  age: Number,
  gender: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
};

module.exports = PatientSchema;
