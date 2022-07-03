const {BuyHistory} = require("../models");

class BuyHistoryService{

    async getBuyHistoryByUserID(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        let getBuyHistory=null;

        getBuyHistory=await BuyHistory.findAll({
            where:{userID: userID},
        })

        if (getBuyHistory.length==0){
            result.message = `No Purchase History found for userID: ${userID}`;
            result.status=404;
            return result;
        }

        result.message = `Purchase History for userid:${userID} retrieved`;
        result.data=getBuyHistory;
        result.status=200;
        return result;

    }

    async saveBuyHistory(userID, itemID, itemSKU, itemName, buyPrice, buyQty){
        let result = {
            message: null,
            status: null,
            data: null,
        }

        await BuyHistory.create({
            userID: userID,
            itemID: itemID,
            itemSKU: itemSKU,
            itemName: itemName,
            buyPrice: buyPrice,
            buyQty: buyQty,
        })

        result.message = `Purchase History for userID:${userID} saved`;
        result.status=200;
        return result;

    }

    async deleteBuyHistory(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        }

        await BuyHistory.destroy({where:{userID:userID}});

        result.message = `All Buy History for userID:${userID} deleted`;
        result.status=200;
        return result;
    }

}

module.exports = BuyHistoryService;