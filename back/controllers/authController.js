const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authController = {
  register: async (req, res) => {
    const { first_name, last_name, email, fonction, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      first_name,
      last_name,
      email,
      fonction,
      role: "user",
      password_hash: hashedPassword,
    };

    try {
      console.log("Attempting to register user with data:", userData);
      const userId = await User.create(userData);
      res
        .status(201)
        .json({ message: "User registered successfully", user_id: userId });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Error logging in" });
    }
  },
};

module.exports = authController;
