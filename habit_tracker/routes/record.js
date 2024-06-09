const express = require("express");
const recordController = require("../controllers/recordController");
const router = express.Router();



router.get("/", recordController.renderRecordPage);
router.get("/recordDetailHabit", recordController.renderRecordDetailPage);
module.exports = router;
