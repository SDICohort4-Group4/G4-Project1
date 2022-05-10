const ItemService=require("../services/item.service");
const itemService=new ItemService;

class ItemController{

    // get all items data
    async getAll(req,res){
        const result=await itemService.getAll();
        res.status(result.status);
        return res.json({data:result.data,message:result.message});

    };

    // add a new item
    async addItem(req,res){
        const {sku,itemName}=req.body;
        // check that data is valid format or is not an empty string
        if (typeof sku!="string" || typeof itemName!="string" || sku==="" || itemName===""){
            res.status(400);
            return res.json({message:"Item information is invalid"})
        }

        // send data to ORM service layer
        const result= await itemService.addItem(sku,itemName);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});

    }

}

module.exports=ItemController;