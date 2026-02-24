const express = require("express");

const router = express.Router();

//route
router.route("/").get((req, res) => {
  res.render("home", { shortUrl: null, error: null });
});

module.exports = router;
