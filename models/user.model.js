const {DataTypes, Model} = require ("sequelize");
const {sequelize}=require("./dbconfig")

class User extends Model{}

User.init();

module.exports=User;