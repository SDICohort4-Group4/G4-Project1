const ItemService=require("../services/item.service");
const itemService=new ItemService;

class ItemController{

    async getAll(req,res){
        const result=await itemService.getAll();
        res.status(result.status);
        return res.json({data:result.data,message:result.message});

    };

    async addItem(req,res){
        const {sku,itemName}=req.body;
        if (typeof sku!="string" || typeof itemName!="string" || sku==="" || itemName===""){
            res.status(400);
            return res.json({message:"Item information is invalid"})
        }

        const result= await itemService.addItem(sku,itemName);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});

    }

}

module.exports=ItemController;