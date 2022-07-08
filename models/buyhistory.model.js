const {DataTypes, Model} = require ("sequelize");

module.exports = function(sequelize){
    class BuyHistory extends Model{}

    BuyHistory.init(
        {   
            buyHistoryID: {
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            itemID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            itemSKU: {
                type: DataTypes.STRING,
                allowNull: false
            },
            itemName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            buyPrice: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            buyQty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stripeID:{
                type: DataTypes.STRING,
                allowNull:false,
                defaultValue:"none",
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:"none",
            },
            stripeAmount:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0,
            },
            stripePaymentMethodID:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:"none",
            },
            stripeClientSecret:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:"none",
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
            modelName: "buyhistory",
            tableName: "buyhistory",
        }
    );
    return BuyHistory;
}