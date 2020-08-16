const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: "online_shop",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now connected ... ");
});

module.exports = connection;
