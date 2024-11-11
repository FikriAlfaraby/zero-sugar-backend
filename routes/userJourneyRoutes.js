const express = require("express");
const userJourneyController = require("../controllers/userJourneyController");

const router = express.Router();
router.get("/:id", userJourneyController.getUserJourney);
router.post("/:id", userJourneyController.createUserJourney);

module.exports = router;