const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller");
const cartController = new CartController;

router.get("/cart/:userid",cartController.getCartContents)

module.exports = router;