const express = require("express");
const app = express();
app.use(express.json()); //enable express to parse JSON as request body
const itemRoutes = require("./item.routes")
const userRoutes = require("./user.routes")
const adminUserRoutes = require("./admin.user.routes");
const refreshTokenRoutes = require("./auth.routes");

app.use(itemRoutes);
app.use(userRoutes);
app.use(adminUserRoutes);
app.use(refreshTokenRoutes);

module.exports = app