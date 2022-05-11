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
            result.message = `Item SKU: ${sku} does not exist`
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

    async updateItem(
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
        deleted,
        expiryDate
    ){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        // check whether item sku already exists
        const checkItem = await Item.findOne({where:{SKU:sku}});

        if (checkItem == null){
            result.message = `Item SKU: ${sku} does not exist`;
            result.status = 400;

            return result;
        }
        
        function isValidURL(string) {
            var result = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

            return (result !== null)
        }

        if(itemName !== null){
            Item.itemName = itemName;
        }

        if(itemDescription !== null){
            Item.itemDescription = itemDescription;
        }

        if(itemPrice !== null && (typeof itemPrice == "number") && itemPrice >= 0){
            Item.itemPrice = itemPrice;
        }

        if(itemSalePrice !== null && (typeof itemSalePrice == "number") && itemSalePrice >= 0){
            Item.itemSalePrice = itemSalePrice;
        }

        if(itemDiscount !== null && (typeof itemDiscount == "number") && itemDiscount >= 0){
            Item.itemDiscount = itemDiscount;
        }

        if(itemCategory1 !== null && (typeof itemCategory1 == "string")){
            Item.itemCategory1 = itemCategory1;
        }

        if(itemCategory2 !== null && (typeof itemCategory2 == "string")){
            Item.itemCategory2 = itemCategory2;
        }

        if(brand !== null && (typeof brand == "string")){
            Item.brand = brand;
        }

        if(itemPic1 !== null && isValidURL(itemPic1)){
            Item.itemPic1 = itemPic1;
        }

        if(itemPic2 !== null && isValidURL(itemPic2)){
            Item.itemPic2 = itemPic2;
        }

        if(Qty !== null && (typeof Qty == "number") && Qty >= 0){
            Item.Qty = Qty;
        }

        if(hidden !== null && (typeof hidden == "boolean")){
            Item.hidden = hidden;
        }

        if(deleted !== null && (typeof deleted == "boolean")){
            Item.deleted = deleted;
        }

        if(expiryDate !== null){
            Item.expiryDate = expiryDate;
        }
        
        result.message = "Item Successfully Updated";
        result.status = 200;
        result.data = await Item.findOne({where:{SKU:sku}})

        return result;
    };


}

module.exports = ItemService;