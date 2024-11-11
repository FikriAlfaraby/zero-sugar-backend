const express = require("express");
const catalogController = require("../controllers/catalogController");

const router = express.Router();
router.get("/", catalogController.getAllCatalog);
router.post("/", catalogController.createCatalog);

module.exports = router;