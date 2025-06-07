// backend/middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Corrected key: decoded._id (not decoded.id)
    req.user = {
      _id: new ObjectId(decoded._id),
      email: decoded.email, // optional: if included in JWT payload
    };

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
