const Router = require("express").Router;
const fs = require("fs-extra");

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.type("text/html");
  res.render(`${__dirname}/../views/home.ejs`);
});

pageRouter.get("/about", (req, res) => {
  res.type("text/html");
  res.render(`${__dirname}/../views/about.ejs`);
});

module.exports = pageRouter;
