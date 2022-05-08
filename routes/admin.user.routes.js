const express=require("express");
const router=express.Router();

router.get("/admin",(req,res)=>{
    return res.send("Admin route is working!")
})


module.exports=router;