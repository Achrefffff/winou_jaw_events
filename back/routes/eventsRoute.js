const express = require("express");
const multer = require("multer");
const path = require("path");
const eventsController = require("../controllers/eventsController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.get("/", eventsController.getAllEvents);
router.get("/:id", eventsController.getEventById);
router.post("/", upload.single("logo"), eventsController.createEvent);
router.put("/:id", upload.single("logo"), eventsController.updateEvent);
router.delete("/:id", eventsController.deleteEvent);
router.get("/:id/activities", eventsController.getEventActivities);

module.exports = router;
