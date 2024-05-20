
const userController = require("../controller/userController");

const router = require("express").Router();

router.post("/", userController.signupUser);

module.exports = router;