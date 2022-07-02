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

        const result=await buyHistoryService.saveBuyHistory();

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