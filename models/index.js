// Import database models
const {Sequelize}=require("sequelize");
const User=require("./user.model");
const Item=require("./item.model");
const AdminUser=require("./admin.user.model")

// Import database configuration
const {sequelize}=require("./dbconfig")


// Test connection function
async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }

module.exports={
    sequelize,
    testConnection,
    User,
    Item,
    AdminUser,
}