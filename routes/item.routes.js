const express=require("express");
const router=express.Router();

router.get("/item",(req,res)=>{
    return res.send("Item route is working!")
})

module.exports=router;