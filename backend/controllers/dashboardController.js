const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function getDashboardData(req, res) {
  const userId = req.query.userId;
  const db = getDB();

  // Fetch all appointments for the doctor
  const appointments = await db
    .collection("appointments")
    .find({ userId: new ObjectId(userId) })
    .toArray();

  // Sum of all bills for the doctor
  const billingResult = await db
    .collection("bills")
    .aggregate([
      { $match: { userId: new ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])
    .toArray();

  res.json({
    appointments: appointments.length,
    totalCollection: billingResult[0]?.total || 0,
  });
}

module.exports = { getDashboardData };
