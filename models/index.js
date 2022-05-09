// Import database models
const {Sequelize}=require("sequelize");

// DB Configuration for local
// const sequelize = new Sequelize("g4p2", "postgres", "game4Song", {
//   host: "localhost",
//   dialect: "postgres",
// });

// DB configuration for Heroku
const sequelize= new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require:true,
      rejectUnauthorized: false
    }
  }
});


// Import db models
const AdminUser=require("./admin.user.model")(sequelize);
const User=require("./user.model")(sequelize);
const Item=require("./item.model")(sequelize);

// Create db tables if they do not exist
AdminUser.sync();
User.sync();
Item.sync();

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