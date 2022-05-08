const {Item}=require("../models")

class ItemService{

    async getAll(){
        let result={
            message:null,
            status:null,
            data:null,
        };
        
        const getAllItems=await Item.findAll();
        result.message="All Items retrieved";
        result.data=getAllItems;
        result.status=200;
        return result;

    };

    async addItem(sku, itemName){
        let result={
            message:null,
            status:null,
            data:null,
        };

        const checkItem= await Item.findOne({where:{SKU:sku}});
        if (checkItem!==null){
            result.message=`Item SKU: ${sku} already exists`;
            result.status=400;
            return result;
        }
        
        await Item.create({SKU:sku,itemName:itemName});
        result.message="Item Successfully added";
        result.status=200;
        return result;
    };


}

module.exports=ItemService;