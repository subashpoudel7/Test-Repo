const express = require("express");
const client = require("./database.js");

const app = express();
const cors = require("cors");

const approuter = require("./app-routes");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(approuter);

client.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err);
  } else {
    console.log("Connected to database at", res.rows[0].now);
  }
});

app.listen(process.env.LOCAL_SERVER_PORT, () => {
  console.log("Server connected");
});
