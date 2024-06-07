
const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

router.get("/create", habitController.createHabitPage);
router.post("/create", habitController.createHabit);
router.get("/updateProgress", habitController.renderUpdateProgressPage);
router.post("/updateProgress", habitController.updateProgress);
router.get("/", habitController.getAllHabit);
router.get("/editHabit", habitController.renderEditHabitPage);
router.post("/deleteHabit/:habit_id", habitController.deleteHabit);
module.exports = router;