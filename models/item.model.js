const {DataTypes, Model} = require ("sequelize");
const {sequelize}=require("./dbconfig")

class Item extends Model{}

Item.init(
    {
        itemID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        SKU: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemDescription: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        itemPrice:  {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        itemSalePrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        itemDiscount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        itemCategory1: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        itemCategory2: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        itemPic1: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        itemPic2: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        UOM: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pc",
        },
        Qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdByAdminID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updatedByAdminID: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        createdAt: {
            type: DataTypes.DATE,
            //   field: "created_at",
        },
        updatedAt: {
            type: DataTypes.DATE,
            //   field: "updated_at",
        },
    }

);


//create table if it does not exists
Item.sync();

module.exports=Item;