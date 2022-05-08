const {DataTypes, Model} = require ("sequelize");
const {sequelize}=require("./dbconfig")

class AdminUser extends Model{}

AdminUser.init(
    {
        adminID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        adminName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adminEmail: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        adminPwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adminRole: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"read",
        },
        createdAt: {
            type: DataTypes.DATE,
            //   field: "created_at",
        },
        updatedAt: {
            type: DataTypes.DATE,
            //   field: "updated_at",
        },
      },
      {
        sequelize,
        modelName: "adminuser",
        tableName: "adminusers",
      }
);

//create table if it does not exists
AdminUser.sync();

module.exports=AdminUser;