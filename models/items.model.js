const {DataTypes, Model, Sequelize} = require ("sequelize");
//const sequelize=new Sequelize('postgresql');

class Item extends Model{}

Item.init();

module.exports=Item;