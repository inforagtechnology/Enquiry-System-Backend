const express = require("express");
const router = express.Router();
const {createAdminOrHR} = require("../controller/adminController");
const {authMiddleware} = require("../middlewares/authMiddleware");

// Super Admin creates Admin or HR
router.post("/create", authMiddleware, createAdminOrHR);

module.exports = router;
