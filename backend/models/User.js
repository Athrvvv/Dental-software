function createUserSchema({ fullName, email, phone, password }) {
  return {
    fullName,
    email,
    phone,
    password,
    createdAt: new Date(),
  };
}

module.exports = { createUserSchema };
