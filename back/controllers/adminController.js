const User = require("../models/userModel");

const adminController = {
  updateUserRole: async (req, res) => {
    const { user_id, role } = req.body;

    try {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await User.update(user_id, { role });

      res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Error updating user role" });
    }
  },
};

module.exports = adminController;
