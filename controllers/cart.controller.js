const CartService = require("../services/cart.service");
const cartService = new CartService;

class CartController{
    
    // get all cart rows with the same userID
    async getCartByUserID(req,res){
        const userID=parseInt(req.params.userid);
             
        if (!Number.isInteger(userID)){
            res.status(400);
            return res.json({
                message:"UserID needs to be an integer"
            })
        }

        const result=await cartService.getCartByUserID(userID);

        res.status(result.status);
        return res.json({
            message:result.message,
            data:result.data
        })
    }

    async saveCart(req,res){

        const { userID, itemID, itemQtyCart } = req.body;

        if (!Number.isInteger(userID) || !Number.isInteger(itemID) || !Number.isInteger(itemQtyCart)) {
            res.status(400);
            return res.json({
                message: "All data must be integers"
            })
        }

        const result=await cartService.saveCart( userID, itemID, itemQtyCart);

        res.status(result.status);
        return res.json({
            message:result.message,
            data:result.data
        })     
    }

    async deleteCart(req,res){
        const userID=parseInt(req.params.userid);
        const itemID=parseInt(req.params.itemid);
        console.log("user ID:",userID);
        console.log("item ID:",itemID);
       
        if (!Number.isInteger(userID)){
            res.status(400);
            return res.json({
                message:"UserID needs to be an integer"
            })
        }

        const result=await cartService.deleteCart(userID,itemID);

        res.status(result.status);
        return res.json({
            message:result.message,
            data:result.data
        })
    }

}

module.exports = CartController;