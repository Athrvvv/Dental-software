const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(); // Default db from URI
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("DB not connected yet");
  }
  return db;
}

module.exports = { connectDB, getDB };
