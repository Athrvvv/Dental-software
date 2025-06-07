// backend/routes/patientRoutes.js
const express = require("express");
const router = express.Router();
const { getAllPatients, createPatient } = require("../controllers/patientController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, getAllPatients);
router.post("/", verifyToken, createPatient);

module.exports = router;
