const {DataTypes, Model, Sequelize} = require ("sequelize");
//const sequelize=new Sequelize('postgresql');

class User extends Model{}

User.init();

module.exports=User;