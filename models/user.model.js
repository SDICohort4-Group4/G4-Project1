const {DataTypes, Model} = require ("sequelize");

module.exports=function(sequelize){
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
                defaultValue:"",
            },
            userNickname: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:"",
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
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "user",
            tableName: "users",
        }
    );
    return User;
}



