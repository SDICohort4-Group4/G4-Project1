const {DataTypes, Model} = require ("sequelize");

module.exports=function(sequelize){
    class AdminUser extends Model {}

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
                defaultValue:"",
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
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "adminuser",
            tableName: "adminusers",
        }
    );
    return AdminUser;
}


