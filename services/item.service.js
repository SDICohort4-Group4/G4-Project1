const {Item} = require("../models")

class ItemService{

    // retrieve all item data from the db
    async getAll(){
        let result = {
            message:null,
            status:null,
            data:null,
        };
        
        const getAllItems = await Item.findAll();

        result.message = "All Items retrieved";
        result.data = getAllItems;
        result.status = 200;

        return result;
    };

    // get specific item data from the db
    async getBySku(sku){
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const getItem = await Item.findOne({where:{SKU:sku}});

        if(getItem == null){
            result.message = "SKU does not exist"
            result.status = 404;

            return result;
        }

        result.message = `Item data retrieved successfully`
        result.data = getItem;
        result.status = 200;

        return result;
    }

    // create a new item record in the db
    async addItem(
        sku, 
        itemName,
        itemDescription,
        itemPrice,
        itemSalePrice,
        itemDiscount,
        itemCategory1,
        itemCategory2,
        brand,
        itemPic1,
        itemPic2,
        UOM,
        Qty,
        hidden,
        expiryDate
    ){
        let result = {
            message:null,
            status:null,
            data:null,
        };

        // check whether item sku already exists
        const checkItem = await Item.findOne({where:{SKU:sku}});

        if (checkItem !== null){
            result.message = `Item SKU: ${sku} already exists`;
            result.status = 400;

            return result;
        }
      
        // create the item in the db
        await Item.create({ 
            SKU: sku,
            itemName: itemName,
            itemDescription: itemDescription,
            itemPrice: itemPrice,
            itemSalePrice: itemSalePrice,
            itemDiscount: itemDiscount,
            itemCategory1: itemCategory1,
            itemCategory2: itemCategory2,
            brand: brand,
            itemPic1: itemPic1,
            itemPic2: itemPic2,
            UOM: UOM,
            Qty: Qty,
            hidden: hidden,
            expiryDate: expiryDate
        });
        
        result.message = "Item Successfully added";
        result.status = 200;

        return result;
    };
}

module.exports = ItemService;