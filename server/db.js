const Pool = require("pg").Pool;

const pool = new Pool({
  user: "king",
  password: "",
  host: "localhost",
  port: 5432,
  database: "fitfriends",
});

module.exports = pool;