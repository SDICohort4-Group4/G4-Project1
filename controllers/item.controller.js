const ItemService = require("../services/item.service");
const itemService = new ItemService;

class ItemController{

    // get all items data
    async getAll(req,res){
        const result = await itemService.getAll();

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        });
    };

    //get specific item by SKU
    async getBySku(req,res){
        const sku = req.params.sku

        // if(typeof sku != 'number'){
        //     res.status(400)
        //     return (res.json({
        //         message:"SKU is invalid"
        //     }))
        // }

        const result = await itemService.getBySku(sku);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
        
    }

    // add a new item
    async addItem(req,res){
        const {
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
        } = req.body;

        // check that data is valid format or is not an empty string
        if (typeof sku != "string" || typeof itemName != "string" || sku  === "" || itemName === ""){
            res.status(400);

            return res.json({
                message: "Item information is invalid"
            })
        };
      
        // send data to ORM service layer
        const result = await itemService.addItem(
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
        );

        res.status(result.status);

        return res.json({
            data: result.data, 
            message: result.message
        });

    }

    async updateItem(req,res){
        const sku = req.params.sku

        const { 
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
        } = req.body;

        // check that data is valid format or is not an empty string
        if (typeof sku!="string" || sku===""){
            res.status(400);

            return res.json({message:"SKU is invalid"})
        }

        const result = await itemService.updateItem(
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
        );

        res.status(result.status);

        return res.json({
            data: result.data, 
            message: result.message
        });
        
    }
}

module.exports = ItemController;