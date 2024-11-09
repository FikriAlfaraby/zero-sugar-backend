const express = require("express");
const clerkController = require("../controllers/clerkController");

const router = express.Router();
router.post("/webhook", clerkController.handleWebhook);

module.exports = router;
