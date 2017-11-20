const Router = require("express").Router;
const apiRouter = Router();

const Job = require("../models/Job.js");
const Company = require("../models/Company.js");

function getAllJobs(req, res) {
  Job.query().then(data => res.json(data));
}

function getAllCompanies(req, res) {
  Company.query()
    .eager("jobs")
    .then(data => res.json(data));
}

apiRouter.get("/jobs", getAllJobs);
apiRouter.get("/companies", getAllCompanies);

module.exports = apiRouter;
