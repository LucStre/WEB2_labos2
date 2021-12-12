const express = require("express");
const session = require("express-session");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.app.users.getUser(req.session.user).role == "admin") {
    res.redirect("/admin");
  } else {
    res.render("user", {
      user: req.session.user,
      secure: res.app.get("secure"),
    });
  }
});

router.post("/", function (req, res, next) {
  if (res.app.get("secure")) {
    res.app.set("secure", false);
    res.render("user", { user: req.session.user, secure: false });
  } else {
    res.app.set("secure", true);
    res.render("user", { user: req.session.user, secure: true });
  }
});

module.exports = router;
