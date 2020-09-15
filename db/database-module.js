const { Pool } = require('pg');
var dbUri = process.env.DATABASE_URL || "postgres://yifllvbingyvdd:5419b3369cc33236b764ddc0f2c0322a172df3eef9b10fede213b318538993f2@ec2-52-31-233-101.eu-west-1.compute.amazonaws.com:5432/d97gacsc91fkr7";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}