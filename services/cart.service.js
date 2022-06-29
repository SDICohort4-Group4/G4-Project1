const {Cart} = require("../models");
const { Op } = require('sequelize')


class CartService{

    async getCartContents(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        let getCart=null;

        getCart=await Cart.findAll({
            where: {userID:`${userID}`}
        })

        console.log("cart:",getCart);

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