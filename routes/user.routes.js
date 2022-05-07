const express=require("express");
const router=express.Router();

router.get("/user",(req,res)=>{
    return res.send("User route is working!")
})

router.get("/",(req,res)=>{
    return res.send("Yay, app is working!")
})

module.exports=router;