const {DataTypes, Model} = require ("sequelize");
const {sequelize}=require("./dbconfig")

class AdminUser extends Model{}

User.init();

module.exports=AdminUser;