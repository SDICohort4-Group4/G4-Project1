const CartService = require("../services/cart.service");
const cartService = new CartService;

class CartController{
    
    // get all cart rows with the same userID
    async getCartContents(req,res){
        const userID=parseInt(req.params.userid);
       
        if (!Number.isInteger(userID)){
            res.status(400);
            return res.json({
                message:"UserID needs to be an integer"
            })
        }

        const result=await cartService.getCartContents(userID);

        res.status(result.status);
        return res.json({
            message:result.message,
            data:result.data
        })
    }

}

module.exports = CartController;