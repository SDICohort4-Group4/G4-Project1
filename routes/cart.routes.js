const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller");
const cartController = new CartController;

router.get("/cart/:userid",cartController.getCartByUserID)

router.post("/cart/save",cartController.saveCart)

router.put("/cart/delete/:userid?/:itemid?",cartController.deleteCart)

module.exports = router;