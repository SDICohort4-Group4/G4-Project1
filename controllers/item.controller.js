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

    async adminGetAll(req,res){
        const result = await itemService.adminGetAll();

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        });
    }

    //get specific item by SKU
    async getBySku(req,res){
        const sku = req.params.sku

        const result = await itemService.getBySku(sku);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    async adminGetBySku(req,res){
        const sku = req.params.sku

        const result = await itemService.adminGetBySku(sku);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    async getByBrand(req,res){
        const brand = req.params.brand

        const result = await itemService.getByBrand(brand);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    
    async adminGetByBrand(req,res){
        const brand = req.params.brand

        const result = await itemService.adminGetByBrand(brand);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    async getByCat1(req,res){
        const cat1 = req.params.cat1

        const result = await itemService.getByCat1(cat1);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    
    async adminGetByCat1(req,res){
        const cat1 = req.params.cat1

        const result = await itemService.adminGetByCat1(cat1);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    async getByCat2(req,res){
        const cat2 = req.params.cat2

        const result = await itemService.getByCat2(cat2);

        res.status(result.status);

        return res.json({
            data: result.data,
            message: result.message
        })
    }

    async adminGetByCat2(req,res){
        const cat2 = req.params.cat2

        const result = await itemService.adminGetByCat2(cat2);

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
        if (typeof sku != "string" || sku === ""){
            res.status(400);

            return res.json({
                message: "SKU is invalid"
            })
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