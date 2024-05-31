const habitController = require("../controllers/habitController");

const router = require("express").Router();
router.get("/create", habitController.createHabitPage);
router.post("/create", habitController.createHabit);
router.get("/", habitController.getAllHabit);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);
module.exports = router;