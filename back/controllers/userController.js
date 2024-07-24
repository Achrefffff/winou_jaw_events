const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const userId = await User.create(req.body);
    res.status(201).json({ userId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (user && user.password_hash === req.body.password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.update(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
