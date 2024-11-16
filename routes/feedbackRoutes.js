const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

// Route untuk POST feedback
router.post("/:idUser", feedbackController.postFeedback);

module.exports = router;
