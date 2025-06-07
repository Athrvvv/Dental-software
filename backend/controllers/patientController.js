// backend/controllers/patientController.js
const {getDB} = require("../config/db");
const { ObjectId } = require("mongodb");

// GET /patients
exports.getAllPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;

    if (!doctorId || !(doctorId instanceof ObjectId)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const db = getDB();
    const patients = await db
      .collection("patients")
      .find({ doctorId }) // already an ObjectId
      .toArray();

    res.status(200).json({ patients });
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ error: "Server error fetching patients" });
  }
};

// POST /patients
exports.createPatient = async (req, res) => {
  try {
    const { fullName, phone, age, gender } = req.body;

    if (!fullName || !phone || !age || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const db = getDB();

    const newPatient = {
      doctorId: req.user._id, // from verified token
      fullName,
      phone,
      age: parseInt(age),
      gender,
      createdAt: new Date(),
    };

    const result = await db.collection("patients").insertOne(newPatient);

    res.status(201).json({
      patient: {
        _id: result.insertedId,
        ...newPatient,
      },
    });
  } catch (err) {
    console.error("Error creating patient:", err);
    res.status(500).json({ error: "Server error while creating patient" });
  }
};
