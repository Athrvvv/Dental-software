const { getDB } = require("../config/db");
const { createUserSchema } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

// Signup Controller
async function signup(req, res) {
  const db = getDB();
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = await db.collection("users").findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = createUserSchema({
    fullName,
    email,
    phone,
    password: hashedPassword,
  });

  const result = await db.collection("users").insertOne(user);

  const token = jwt.sign(
    { id: result.insertedId, email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: result.insertedId.toString(),
      fullName,
      email,
      token,
    },
  });
}

// Login Controller
async function login(req, res) {
  const db = getDB();
  const { fullName, password } = req.body;

  if (!fullName || !password) {
    return res.status(400).json({ message: "Full name and password required" });
  }

  const user = await db.collection("users").findOne({ fullName });
  if (!user) return res.status(401).json({ message: "User not found" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      token,
    },
  });
}

module.exports = { signup, login };
