
const userController = require("../controllers/userController");
const router = require("express").Router();
router.get('/', userController.loginPage);
router.post("/", userController.signup);
router.post("/login", userController.login);
router.get("/getAllUser", userController.getAllUser);
router.put("/:id", userController.updateUser);
module.exports = router;
