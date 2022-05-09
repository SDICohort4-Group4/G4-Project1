// Import database models
const {Sequelize}=require("sequelize");

// DB Configuration
// const sequelize = new Sequelize("d54c910kngshno2", "vkqhmwbduhvfmp", "4d87c51dab0ea7fc088128f077bb4cb6588faeb94500fb0c9a80a2bbeaa5aea5", {
//   host: "ec2-52-4-104-184.compute-1.amazonaws.com",
//   dialect: "postgres",
// });

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
// AdminUser.sync();
// User.sync();
// Item.sync();

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