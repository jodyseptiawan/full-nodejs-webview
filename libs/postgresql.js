const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "MyDatabase",
  password: "admin",
  port: 5432,
});

// Connect to PostgreSQL database
client
  .connect()
  .then(() => {
    console.log("");
    console.log("+-----------------------+");
    console.log("|");
    console.log("| Connected to PostgreSQL");
    console.log("|");
    console.log("+-----------------------+");
    console.log("");
  })
  .catch((err) => {
    console.log("");
    console.log("+-----------------------+");
    console.log("|");
    console.error("| Error connecting to PostgreSQL", err);
    console.log("|");
    console.log("+-----------------------+");
    console.log("");
  });

module.exports = client;
