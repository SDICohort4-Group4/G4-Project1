const {Cart, User, Item} = require("../models");
const { Op } = require('sequelize')

class CartService{

    excludeData = [                
        "hidden", 
        "deleted", 
        "expiryDate", 
        "createdByAdminID", 
        "updatedByAdminID", 
        "createdAt", 
        "updatedAt",
        "cartContentsID",
    ];

    async getCartByUserID(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        let getCart=null;

        getCart=await Cart.findAll({
            raw: true, //avoid nesting in result object
            attributes: {exclude: this.excludeData},
            include: {
                model: Item,
                required: true,
                attributes: {exclude: this.excludeData}
            },
            where: {userID: userID},
        })

        if (getCart.length == 0){
            result.message = `No cart found for userID: ${userID}`;
            result.status=404;
            return result;
        }

        result.message = "Cart Contents retrieved";
        result.data=getCart;
        result.status=200;
        return result;
    }

    async saveCart(userID, itemID, itemQtyCart){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        await Cart.create({
            userID: userID,
            itemID: itemID,
            itemQtyCart: itemQtyCart,
        })

        result.message = "Cart Contents saved";
        result.status=200;
        return result;
    }

    async deleteCart(userID, itemID){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        // if itemid is not present, delete all based on userid
        if (!itemID){
            await Cart.destroy({where: {userID: userID}})
            result.message = `All Cart contents for userID:${userID} deleted`;
        } //else delete based on userid and itemid
        else {
            await Cart.destroy({where: {userID: userID, itemID: itemID}})
            result.message = `Only itemID:${itemID} for userID:${userID} deleted`;
        }
        
        result.status=200;
        return result;
    }

}

module.exports = CartService;