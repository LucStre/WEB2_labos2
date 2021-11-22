const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// home page
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/authentication', function (req, res) {
    res.render('authentication');
});

app.get('/externalXML', function (req, res) {
    res.render('externalXML');
});

app.get('/access', function (req, res) {
    res.render('access');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})