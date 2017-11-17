exports.up = function(knex, Promise) {
  return knex.schema.createTable("company", table => {
    table.string("name");
    table.text("description"); // es como varchar()
    table.string("imageLink");
    table.string("location");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("company");
};
