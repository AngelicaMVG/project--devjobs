const express = require("express");
const fs = require("fs-extra");
const ejs = require("ejs");
const { Model } = require("objection");

const pageRouter = require("./src/routers/pageRouter.js");
const apiRouter = require("./src/routers/apiRouter.js");

const connectToDb = require("./src/database/dbConnect.js");
const knexfile = require("./knexfile.js");

const app = express();
const appDb = connectToDb(knexfile.development);

Model.knex(appDb);

app.locals.db = appDb; //locals: esta disponible en toda la app de express

app.set("view engine", "ejs");
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
