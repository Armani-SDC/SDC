const pg = require('pg');

const pool = new pg.Pool({
  user: "postgres",
  password: "postgres",
  database: "sdcproducts"
});

module.exports = pool;