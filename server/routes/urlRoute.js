const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

//post
router.route("/generate").post(urlController.handleGenerateUrl);

//redirect
router.get("/:shortId", urlController.redirectToOriginalUrl);

//Analytics
router.get("/analytics/:shortId", urlController.handleGetAnalytics);

module.exports = router;
