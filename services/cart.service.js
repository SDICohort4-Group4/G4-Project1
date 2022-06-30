const {Cart, User, Item, sequelize} = require("../models");
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

    async getCartContents(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        let getCart=null;

        getCart=await Cart.findAll({
            raw: true, //avoid nesting in result
            attributes: {exclude: this.excludeData},
            include: {
                model: Item,
                required: true,
                attributes: {exclude: this.excludeData}
            },
            where: {userID:`${userID}`},
        })

        if (getCart.length == 0){
            result.message = `No cart found for userID:${userID}`;
            result.status=404;
            return result;
        }

        result.message = "Cart Contents retrieved";
        result.data=getCart;
        result.status=200;

        return result;
    }

}

module.exports = CartService;