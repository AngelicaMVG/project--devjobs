exports.up = function(knex, Promise) {
  return knex.schema.table("company", table => {
    table
      .integer("companyId")
      .unsigned()
      .references("companyId")
      .inTable("jobs");
    return table;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("company", table => {
    table.dropForeign("companyId");
    table.dropColumn("companyId");
    return table;
  });
};
