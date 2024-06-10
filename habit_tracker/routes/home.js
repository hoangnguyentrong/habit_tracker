const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/", homeController.showHomePage);
router.get("/userDetail", homeController.showUserDetail)
module.exports = router;