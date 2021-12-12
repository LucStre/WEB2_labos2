const express = require("express");
const session = require("express-session");

const router = express.Router();

router.get("/", (req, res) => {
  res.app.set("secure", true);
  res.render("home", { user: req.session.user, secure: true });
});

router.post("/", function (req, res, next) {
  if (res.app.get("secure")) {
    res.app.set("secure", false);
    res.render("home", { user: req.session.user, secure: false });
  } else {
    res.app.set("secure", true);
    res.render("home", { user: req.session.user, secure: true });
  }
});

module.exports = router;
