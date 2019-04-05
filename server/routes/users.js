var express = require("express");
var router = express.Router();
var User = require("mongoose").model("User");
var util = require("../util");
var config = require("../configs/config.json");

router.post("/login", function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username, password: util.md5Pwd(password) }, function(
    err,
    doc
  ) {
    if (!doc) {
      return res.json({ code: 1, msg: "Username or Password is wrong." });
    }
    const { username, _id, permissions } = doc;
    res.cookie("userid", _id);
    return res.json({ code: 0, data: { username, permissions, _id } });
  });
});

router.post("/register", function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "User exists." });
    }
    const userModel = new User({
      username,
      password: util.md5Pwd(password),
      role: "basic",
      permissions: config["role-permissions"].basic
    });
    userModel.save(function(e, d) {
      if (e) {
        return res.json({ code: 1, msg: "Fail to register." });
      }
      const { username, _id, permissions } = d;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { username, permissions, _id } });
    });
  });
});

router.get("/getUserInfo", function(req, res, next) {
  const userid = req.cookies.userid;
  User.findOne({ _id: userid }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "User doesn't exist." });
    }
    const { username, _id, permissions } = doc;
    return res.json({ code: 0, data: { username, permissions, _id } });
  });
});

module.exports = router;
