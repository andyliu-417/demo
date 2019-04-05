var express = require("express");
var router = express.Router();
var Event = require("mongoose").model("Event");

/* GET users listing. */
router.get("/list", function(req, res, next) {
  Event.find({}, function(err, doc) {
    return res.json(doc);
  });
});

router.post("/add", function(req, res) {
  const { title, date, url, celebrity, description } = req.body;

  const eventModel = new Event({
    title,
    date,
    url,
    celebrity,
    description
  });
  eventModel.save(function(e, data) {
    if (e) {
      return res.json({ code: 1, msg: "error" });
    }
    return res.json({ code: 0, data });
  });
});

router.post("/remove", function(req, res) {
  const { _id } = req.body;
  Event.deleteOne({ _id }, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "error" });
    }
    return res.json({ code: 0, data: doc.n });
  });
});

module.exports = router;
