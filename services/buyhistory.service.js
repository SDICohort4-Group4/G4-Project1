

class BuyHistoryService{

    async getBuyHistoryByUserID(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        result.message = `Get Buy History Route`;
        // result.data=getBuyHistory;
        result.status=200;
        return result;

    }

    async saveBuyHistory(){
        let result = {
            message: null,
            status: null,
            data: null,
        }

        result.message = `Save Buy History Route`;
        result.status=200;
        return result;

    }

    async deleteBuyHistory(userID){
        let result = {
            message: null,
            status: null,
            data: null,
        }

        result.message = `Delete Buy History Route`;
        result.status=200;
        return result;
    }

}

module.exports = BuyHistoryService;