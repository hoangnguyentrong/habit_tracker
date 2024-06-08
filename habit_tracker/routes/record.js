const express = require("express");
const recordController = require("../controllers/recordController");
const router = express.Router();



router.get("/", recordController.renderRecordPage);

module.exports = router;
