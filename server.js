const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.listen(4000, () => {
  console.log("Listenning on port 4000");
});

require("./lib/router.js")(app, path)
