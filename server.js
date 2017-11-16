const express = require("express");
const fs = require("fs-extra");

const app = express();

const PATH = `${__dirname}/src/views/home.html`;
app.use("/", (req, res) => {
  fs.readFile(PATH, "utf8").then(data => {
    res.send(data);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app lisening on port ${PORT}`);
});
