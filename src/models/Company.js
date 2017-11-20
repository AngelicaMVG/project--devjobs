const { Model } = require("objection");

class Company extends Model {
  static get tableName() {
    return "company";
  }

  static get relationMappings() {
    const Jobs = require("./Job.js");
    return {
      jobs: {
        relation: Model.HasManyRelation,
        modelClass: Jobs,
        join: {
          from: "company.companyId",
          to: "jobs.companyId"
        }
      }
    };
  }
}

module.exports = Company;
