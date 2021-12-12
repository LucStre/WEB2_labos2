var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  //check if a registered user is trying to access the admin page
  if (req.session.user === undefined) {
    res.render("admin", { user: req.session.user, err: "Forbidden access." });
    return;
  }

  //check for the 'admin' role of the user trying to access
  if (req.app.users.getUser(req.session.user).role != "admin") {
    res.render("admin", { user: req.session.user, err: "Forbidden access." });
    return;
  }

  //render the page
  res.render("admin", { user: req.session.user, err: undefined });
});

module.exports = router;
