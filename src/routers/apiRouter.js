const Router = require("express").Router;
const apiRouter = Router();

function getAllJobs(req, res) {
  const db = req.app.locals.db;

  db
    .select()
    .table("jobs")
    .then(data => res.json(data));
}

function getAllCompanies(req, res) {
  const db = req.app.locals.db;

  db
    .select()
    .table("company")
    .then(data => res.json(data));
}

apiRouter.get("/jobs", getAllJobs);
apiRouter.get("/companies", getAllCompanies);

module.exports = apiRouter;
