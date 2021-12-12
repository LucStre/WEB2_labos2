const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const path = require("path");
const port = 3000;

const homeRouter = require("./routes/home");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const userData = require("./model/UserData");

//express middleware setup
const app = express();

//cookie-parsing middleware
app.use(cookieParser());

//body content parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//session middleware (transient session records)
app.use(session({ secret: "WEB2", resave: false, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.set("views", path.join(__dirname, "views"));
// set the view engine to ejs
app.set("view engine", "ejs");

// routes
app.use("/", homeRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

//read the user settings
app.users = new userData("./data/users.json");
app.users.initialize(true);

// use res.render to load up an ejs view file
// home page
app.get("/", function (req, res) {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
