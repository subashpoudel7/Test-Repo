const express = require("express");
const sendEmail = require("./middlewares/mail-service/send-mail");
const { create, getAll } = require("./query/users");
const router = express.Router();
const db = require("./database");

router.get("/users-data", async (req, res) => {
  console.log("aaxa hai yaha samma hahaha1");
  let allData = await getAll();
  res.json({ rows: allData });
});

router.post("/users-data", (req, res) => {
  console.log("aaxa hai yaha samma hahaha2");

  let { body } = req;
  let createdData = create(body?.name, body?.email);
  res.json(createdData);
});

router.post("/send-email", async (req, res) => {
  const { subject, message } = req.body;

  const result = await db.query("SELECT email FROM users");

  const to = result.rows.map((row) => row.email);

  await sendEmail(to, subject, message);

  res.json({ message: "Email sent successfully" });
});

module.exports = router;
