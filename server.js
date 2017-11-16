const express = require("express");
const fs = require("fs-extra");
const ejs = require("ejs");

const app = express();

const pageRouter = require("./src/routers/pageRouter.js");
const apiRouter = require("./src/routers/apiRouter.js");

app.use("/", pageRouter);
app.use("/api", apiRouter);
app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
  res.type("text/html");
  res.render(`${__dirname}/src/views/404.ejs`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});
