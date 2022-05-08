const {DataTypes, Model} = require ("sequelize");
const {sequelize}=require("./dbconfig")

class Item extends Model{}

Item.init();

module.exports=Item;