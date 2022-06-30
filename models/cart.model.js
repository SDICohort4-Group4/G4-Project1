const {DataTypes, Model} = require ("sequelize");

module.exports = function(sequelize){
    class Cart extends Model{}

    Cart.init(
        {
            cartContentsID: {
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
            itemQtyCart: {
                type:DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
            modelName: "cart",
            tableName: "carts",
        }
    )
    return Cart;
}