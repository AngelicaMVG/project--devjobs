exports.up = function(knex, Promise) {
  return knex.schema.createTable("jobs", jobsTable => {
    jobsTable.string("title");
    jobsTable.text("description"); // es como varchar()
    jobsTable.string("location");
    jobsTable.integer("salary");
    jobsTable.boolean("fullTime");
    jobsTable.integer("companyId");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jobs");
};
