
const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
router.get("/create", habitController.createHabitPage);
router.post("/create", habitController.createHabit);
router.get("/", habitController.getAllHabit);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);
module.exports = router;