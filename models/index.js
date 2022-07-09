// Import database models
const {Sequelize} = require("sequelize");

let sequelize = null;

// DB Configuration 
// checks if DATABASE_URL is available and toggles between heroku or localhost settings
if (process.env.DATABASE_URL !== undefined) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
            require:true,
            rejectUnauthorized: false
            }
        }
    });
} else {
    // import local db config
    const {localdbName, localdbUser, localdbPwd} = require("./localdbconfig");
    
    sequelize = new Sequelize(localdbName, localdbUser, localdbPwd, {
    host: "localhost",
    dialect: "postgres",
    });

}

// DB configuration for Heroku
// const sequelize= new Sequelize(process.env.DATABASE_URL, {
//     dialectOptions: {
//     ssl: {
//         require:true,
//         rejectUnauthorized: false
//     }
//     }
// });


// Import db models
const AdminUser = require("./admin.user.model")(sequelize);
const User = require("./user.model")(sequelize);
const Item = require("./item.model")(sequelize);
const RefreshToken = require("./refreshToken.model")(sequelize);
const Cart=require("./cart.model")(sequelize);
const BuyHistory=require("./buyhistory.model")(sequelize);

// create foreign key associations
Item.belongsTo(AdminUser,{
    foreignKey:"createdByAdminID",
    foreignKey:"updatedByAdminID",
})


RefreshToken.belongsTo(User, {
    foreignKey: 'userId', targetKey: 'userID'
});

User.hasOne(RefreshToken, {
    foreignKey: 'userId', targetKey: 'userID'
});

RefreshToken.belongsTo(AdminUser, {
    foreignKey: 'adminId', targetKey: 'adminID'
});

AdminUser.hasOne(RefreshToken, {
    foreignKey: 'adminId', targetKey: 'adminID'
});

Cart.belongsTo(User,{
    foreignKey:"userID"
});

Cart.belongsTo(Item,{
    foreignKey:"itemID",
});

BuyHistory.belongsTo(User,{
    foreignKey:"userID"
});

BuyHistory.belongsTo(Item,{
    foreignKey:"itemID",
});



// Create db tables if they do not exist
// AdminUser.sync();
// User.sync();
// Item.sync();
// RefreshToken.sync();
// Cart.sync();
BuyHistory.sync({alter:true});

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

module.exports = {
    sequelize,
    testConnection,
    User,
    Item,
    AdminUser,
    RefreshToken,
    Cart,
    BuyHistory,
}