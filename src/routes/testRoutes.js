const express = require("express");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/admin-area", auth, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/recruiter-area", auth, checkRole(["recruiter", "admin"]), (req, res) => {
  res.json({ message: "Welcome Recruiter!" });
});

module.exports = router;
