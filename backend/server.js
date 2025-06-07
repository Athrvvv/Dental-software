const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/patients", patientRoutes); // ✅ Fixed to include /api

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
