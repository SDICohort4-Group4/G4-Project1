const express = require("express");
const app = express();
app.use(express.json()); //enable express to parse JSON as request body
const itemRoutes = require("./item.routes")
const userRoutes = require("./user.routes")
const adminUserRoutes = require("./admin.user.routes");
const refreshTokenRoutes = require("./auth.routes");
const cartRoutes=require("./cart.routes");
const buyHistoryRoutes=require("./buyhistory.routes");
const stripePaymentRoutes=require("./stripe.routes");

app.use(itemRoutes);
app.use(userRoutes);
app.use(adminUserRoutes);
app.use(refreshTokenRoutes);
app.use(cartRoutes);
app.use(buyHistoryRoutes);
app.use(stripePaymentRoutes);

module.exports = app