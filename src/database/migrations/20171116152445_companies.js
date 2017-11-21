exports.up = function(knex, Promise) {
  return knex.schema.createTable("company", jobTable => {
    //primary key
    jobTable.increments();

    //Fields
    jobTable.string("name");
    jobTable.text("description");
    jobTable.string("location");
    jobTable.string("imageLink");

    return jobTable;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("company");
};
