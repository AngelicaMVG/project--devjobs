const devConfig = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: "3306",
    user: "junior",
    password: "root",
    database: "DevJobs"
  },
  migrations: {
    directory: "./src/database/migrations"
  },
  seeds: {
    directory: "./src/database/seeds"
  }
};

module.exports = {
  development: devConfig,
  production: {}
};
