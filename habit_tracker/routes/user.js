
const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/", userController.signup);

router.post("/login", userController.login);

router.get("/", userController.getAllUser);

module.exports = router;
