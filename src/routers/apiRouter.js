const Router = require("express").Router;
const apiRouter = Router();

const Job = require("../models/Job.js");
const Company = require("../models/Company.js");

function getAllJobs(req, res) {
  Job.query().then(data => res.json(data));
}

function getJobById(req, res) {
  Job.query()
    .findById(req.params.id)
    .then(job => {
      return res.status(200).json(job);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

function createJob(req, res) {
  Job.query()
    .insert(req.body)
    .then(newJob => {
      return json(newJob).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function updateJob(req, res) {
  Job.query()
    .updateAndFetchById(req.params.id, req.body)
    .then(jobUpdated => {
      return res.json(jobUpdated).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function deleteJobById(req, res) {
  Job.query()
    .deleteById(req.params.id)
    .then(jobDeleted => {
      return res
        .json({
          rowsDeleted: jobDeleted
        })
        .status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function getAllCompanies(req, res) {
  Company.query()
    .eager("jobs")
    .then(data => res.json(data));
}

function getCompanyById(req, res) {
  Company.query()
    .findById(req.params.id)
    .then(company => {
      return res.status(200).json(company);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function createCompany(req, res) {
  Company.query()
    .insert(req.body)
    .then(newCompany => {
      return res.json(newCompany).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function updateCompany(req, res) {
  Company.query()
    .updateAndFetchById(req.params.id, req.body)
    .then(companyUpdated => {
      return res.json(companyUpdated).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function deleteCompany(req, res) {
  Company.query()
    .where("id", req.params.id)
    .first()
    .returning("*")
    .then(deletedJob => {
      return deletedJob
        .$relatedQuery("jobs")
        .delete()
        .where("companyId", deletedJob.id)
        .returning("*")
        .then(data => {
          console.log("deleting records:", data);
          return deletedJob;
        })
        .catch(err => {
          console.log(err);
          return res.send(err).status(500);
        });
    })
    .then(deletedCompany => {
      return Company.query()
        .deleteById(deletedCompany.id)
        .then(() => {
          return deletedCompany;
        });
    })
    .then(deleteThing => res.json(deleteThing).status(200))
    .catch(err => {
      console.log("errr", err);
      return res.send(err).status(500);
    });
}

//jobs endpoints
apiRouter
  .get("/jobs", getAllJobs)
  .get("/jobs/:id", getJobById)
  .post("/jobs", createJob)
  .put("/jobs/:id", updateJob)
  .delete("/jobs/:id", deleteJobById);

//company endpoints
apiRouter
  .get("/companies", getAllCompanies)
  .get("/companies/:id", getCompanyById)
  .post("/companies", createCompany)
  .put("/companies/:id", updateCompany)
  .delete("/companies/:id", deleteCompany);

module.exports = apiRouter;
