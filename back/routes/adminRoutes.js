const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

// Middleware pour vérifier si l'utilisateur est un administrateur
const isAdmin = (req, res, next) => {
  // Ajoutez votre logique d'authentification et de vérification ici
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

// Route pour mettre à jour le rôle de l'utilisateur
router.post("/update-role", isAdmin, adminController.updateUserRole);

module.exports = router;
