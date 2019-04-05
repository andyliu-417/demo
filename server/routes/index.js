var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("*", function(req, res, next) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../../client/build/")
  });
});

router.get("/test", function(req, res, next) {
  res.json({ title: "test" });
});

module.exports = router;
