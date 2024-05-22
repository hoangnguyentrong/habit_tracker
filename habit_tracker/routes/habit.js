const habitController = require("../controllers/habitController");

const router = require("express").Router();

router.post("/", habitController.createHabit);
router.get("/", habitController.getAllHabit);
module.exports = router;