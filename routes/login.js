var express = require("express");
var router = express.Router();
const cookieParser = require("cookie-parser");
var logincount = 0;

router.get("/", function (req, res, next) {
  let loginName = req.cookies.appuserID || "";
  res.render("login", {
    err: undefined,
    user: req.session.user,
    login: loginName,
  });
});

router.post("/", function (req, res, next) {
  //check that the user is registered
  if (req.session.user !== undefined) {
    res.render("login", {
      user: req.session.user,
      err: "Please log out first.",
    });
    return;
  }
  if (logincount < 3) {
    //check for credentials
    if (
      req.app.users.userExists(req.body.username) &&
      req.app.users.getUser(req.body.username).password == req.body.password
    ) {
      //if successful, set persistent cookie with username (timeout=1 week)
      let expiryDate = new Date(Number(new Date()) + 604800000);
      res.cookie("appuserID", req.body.username, {
        expires: expiryDate,
        httpOnly: true,
      });

      //if successful, redirect to the main page
      req.session.user = req.body.username;
      logincount = 0;
      res.redirect("user");
    } else {
      logincount++;
      res.render("login", {
        user: req.session.user,
        err: "Incorrect username or password.",
      });
    }
  } else {
    if (res.app.get("secure")) sleep(5000);
    logincount = 0;
    res.render("login", {
      user: req.session.user,
      err: "Wait for few seconds.",
    });
  }
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

module.exports = router;
