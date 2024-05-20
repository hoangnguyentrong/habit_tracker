// const userController = require("../controllers/userController");
// const router = require("express").Router();

// // Register a new user
// router.post("/", userController.signup);
// router.post("/login", userController.login);
// // Get user information
// router.get("/", userController.getInformation);

// module.exports = router;

const userController = require("../controllers/userController");
const router = require("express").Router();

// Register a new user
router.post("/", userController.signup);

// Login
router.post("/login", userController.login);

// Get user information
router.get("/", userController.getAllUser);

module.exports = router;
