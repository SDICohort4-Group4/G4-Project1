const express=require("express");
const router=express.Router();

const ItemController=require("../controllers/item.controller");
const itemController= new ItemController;

// // check routing is working
// router.get("/item",(req,res)=>{
//     return res.send("Item route is working!")
// })

router.get("/item",itemController.getAll);

module.exports=router;