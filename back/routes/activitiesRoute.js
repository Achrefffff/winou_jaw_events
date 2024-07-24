const express = require("express");
const activitiesController = require("../controllers/activitiesController");

const router = express.Router();

router.get("/", activitiesController.getAllActivities);
router.get("/:id", activitiesController.getActivityById);
router.post("/", activitiesController.createActivity);
router.put("/:id", activitiesController.updateActivity);
router.delete("/:id", activitiesController.deleteActivity);

module.exports = router;
