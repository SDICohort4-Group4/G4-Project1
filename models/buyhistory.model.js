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