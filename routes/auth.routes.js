const express = require("express");
const router = express.Router();

const AuthController =require("../controllers/auth.controller");
const authController= new AuthController;


router.post("/auth/refreshToken", authController.refresh);

module.exports = router; 