const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", userController.signup);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", userController.login);

router.get("/users", userController.getAllUser);

router.get("/user/:id/update", userController.updateUser);
router.post("/user/:id", userController.updateUser);

router.get("/homepage", (req, res) => {
  res.render("homepage"); // Đảm bảo rằng route này tồn tại
});

module.exports = router;
