const {DataTypes, Model} = require ("sequelize");
const {sequelize}=require("./dbconfig")

class User extends Model{}

User.init(
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userNickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userPwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userAddress1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userAddress2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userPostalCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userCountry: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Singapore",
        },
        userCountryCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 65,
        },
        userPhoneNum: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        modelName: "user",
        tableName: "users",
      }
);

//create table if it does not exists
User.sync();


module.exports=User;