const BuyHistoryService = require("../services/buyhistory.service")
const buyHistoryService = new BuyHistoryService;

class BuyHistoryController {

    async getBuyHistoryByUserID(req,res){
        const userID=parseInt(req.params.userid);

        if (!Number.isInteger(userID)){
            res.status(400);
            return res.json({
                message:"UserID needs to be an integer"
            })
        }   

        const result=await buyHistoryService.getBuyHistoryByUserID(userID)

        res.status(result.status);
        return res.json({
        message:result.message,
            data:result.data
        })
    }

    async saveBuyHistory(req,res){

        const buyHistoryData=req.body;
      
        // check array/object is not empty
        if (buyHistoryData.length==0 || Object.keys(buyHistoryData).length==0){
            res.status(400)
            return res.json({
                message:"Empty Array, not possible to save data"
            })
        }

        // const {userID, itemID, itemSKU, itemName, buyPrice, buyQty} = req.body;
        // check that all data is available as empty fields are not allowed
        // if (!userID || !itemID || !itemSKU || !itemName || !buyPrice || !buyQty){
        //     res.status(400)
        //     return res.json({
        //         message:"All data must be present"
        //     })
        // }
        
        // //check that data is valid
        // if (!Number.isInteger(userID) || 
        //     !Number.isInteger(itemID) || 
        //     (typeof itemSKU!="string") ||
        //     (typeof itemName!="string") || 
        //     (!Number.isInteger(buyPrice)) || 
        //     (!Number.isInteger(buyQty)) ){
        //     res.status(400);
        //     return res.json({
        //         message:"One or more data is an invalid type"
        //     })
        // }
        // const result=await buyHistoryService.saveBuyHistory(userID, itemID, itemSKU, itemName, buyPrice, buyQty);
        
        const result=await buyHistoryService.saveBuyHistory(buyHistoryData);

        res.status(result.status);
        return res.json({
        message:result.message,
            data:result.data
    
        })
    }

    async deleteBuyHistory(req,res){
        const userID=parseInt(req.params.userid);

        if (!Number.isInteger(userID)){
            res.status(400);
            return res.json({
                message:"UserID needs to be an integer"
            })
        }  

        const result=await buyHistoryService.deleteBuyHistory(userID);

        res.status(result.status);
        return res.json({
        message:result.message,
            data:result.data
        })
    }

}

module.exports = BuyHistoryController;