const express = require("express");
const session = require("express-session");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { user: req.session.user, secure: true });
});

router.post("/", function (req, res, next) {
  if (req.body.security == "0") {
    res.render("home", { user: req.session.user, secure: true });
  } else if (req.body.security == "1") {
    res.render("home", { user: req.session.user, secure: false });
  }
});

module.exports = router;
