const {BuyHistory, Item} = require("../models");

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
            order: [['createdAt', 'DESC']]
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

    async saveBuyHistory(buyHistoryData){
        let result = {
            message: null,
            status: null,
            data: null,
        }

        // loop through the array to save individual items
        for(let i=0;i<buyHistoryData.length;i++){
            await BuyHistory.create({
                userID: buyHistoryData[i].userID,
                itemID: buyHistoryData[i].itemID,
                itemSKU: buyHistoryData[i].itemSKU,
                itemName: buyHistoryData[i].itemName,
                buyPrice: buyHistoryData[i].buyPrice,
                buyQty: buyHistoryData[i].buyQty,
                stripeID: buyHistoryData[i].stripeID,
                currency: buyHistoryData[i].currency,
                stripeAmount: buyHistoryData[i].stripeAmount,
                stripePaymentMethodID: buyHistoryData[i].stripePaymentMethodID,
                stripeClientSecret: buyHistoryData[i].stripeClientSecret,
            })

            // find and delete from items table the purchased qty
            const checkItemQty= await Item.findByPk(buyHistoryData[i].itemID);
            let temp=checkItemQty.Qty-buyHistoryData[i].buyQty;
            checkItemQty.Qty=temp;
            await checkItemQty.save();
        }

        result.message = `Purchase History saved`;
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