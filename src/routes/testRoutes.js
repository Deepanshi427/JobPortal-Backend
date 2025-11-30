const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

router.get(
  "/admin",
  authMiddleware,
  checkRole(["admin"]),
  (req, res) => {
    res.json({ message: "RBAC working! Welcome Admin" });
  }
);

module.exports = router;
