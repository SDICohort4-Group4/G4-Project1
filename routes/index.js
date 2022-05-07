const express=require("express");
const app=express();
app.use(express.json()); //enable express to parse JSON as request body
const itemRoutes=require("./item.routes")
const userRoutes=require("./user.routes")

app.use(itemRoutes);
app.use(userRoutes);

module.exports=app