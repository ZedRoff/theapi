const express = require("express");
const app = express();
const path = require("path")
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.listen(4000, () => {
  console.log("Listenning on port 4000");
});

require("./lib/router.js")(app, path)