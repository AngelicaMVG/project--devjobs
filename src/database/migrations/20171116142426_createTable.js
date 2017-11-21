exports.up = function(knex, Promise) {
  return knex.schema.createTable("jobs", jobTable => {
    //primary key
    jobTable.increments();

    //Fields
    jobTable.string("title");
    jobTable.text("description");
    jobTable.string("location");
    jobTable.integer("salary");
    jobTable.boolean("fullTime");

    return jobTable;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jobs");
};
