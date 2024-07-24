const db = require("../db");

const User = {
  create: async (userData) => {
    const { first_name, last_name, email, fonction, role, password_hash } =
      userData;
    const [result] = await db.query(
      "INSERT INTO Users (first_name, last_name, email, fonction, role, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, fonction, role, password_hash]
    );
    return result.insertId;
  },
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE user_id = ?", [
      id,
    ]);
    return rows[0];
  },
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Users");
    return rows;
  },
  update: async (id, updates) => {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    const query = `UPDATE Users SET ${fields} WHERE user_id = ?`;
    await db.query(query, [...values, id]);
  },
  delete: async (id) => {
    await db.query("DELETE FROM Users WHERE user_id = ?", [id]);
  },
};

module.exports = User;
