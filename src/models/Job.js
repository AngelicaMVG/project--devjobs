const { Model } = require("objection");

class Job extends Model {
  static get tableName() {
    return "jobs";
  }
  static get relationMappings() {
    const Company = require("./Company.js");

    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: "jobs.companyId",
          to: "company.id"
        }
      }
    };
  }
}

module.exports = Job;
