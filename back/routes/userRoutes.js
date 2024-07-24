const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Ajouter cette ligne pour la création d'utilisateur
router.post("/", userController.register);

module.exports = router;
