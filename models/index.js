// Import database models
const {Sequelize}=require("sequelize");
const User=require("./users.model");
const Item=require("./items.model");


// DB configuration
const sequelize = new Sequelize("g4p2", "postgres", "game4Song", {
    host: "localhost",
    dialect: "postgres",
  });

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
}