const express = require("express");
const userProfileController = require("../controllers/userProfileController");

const router = express.Router();
router.get("/:id", userProfileController.getUserProfileByIdUser);
router.post("/:id", userProfileController.createUserProfile);

module.exports = router;