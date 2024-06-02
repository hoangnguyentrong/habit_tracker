const express = require("express");
const goalController = require("../controllers/goalController");
const router = express.Router();

router.get("/", goalController.getTarget);
module.exports = router;