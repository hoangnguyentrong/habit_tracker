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
router.post("/logout", userController.logout);
router.get("/updateUser", userController.renderUpdatePage);
router.post("/updateUser/:id", userController.updateUser);

module.exports = router;
