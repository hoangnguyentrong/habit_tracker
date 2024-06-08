const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", userController.signup);
router.get("/login", userController.loginPage);
router.post("/login", userController.login);
router.get("/users", userController.getAllUser);
router.get("/profile", userController.renderProfilePage);
router.post("/logout", userController.logout);
router.get("/user/:id/update", userController.updateUser);
router.post("/user/:id", userController.updateUser);

module.exports = router;
