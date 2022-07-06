const express = require("express");
const router = express.Router();

const StripePaymentController = require("../controllers/stripe.controller");
const stripePaymentController = new StripePaymentController;

router.post("/stripepayment/",stripePaymentController.doPayment);

module.exports=router;
