const express=require("express");
const router=express.Router();

const UserController=require("../controllers/user.controller");
const UserController= new UserController();

// check routing is working
router.get("/user",(req,res)=>{
    return res.send("User route is working!")
})

// check routing is working
router.get("/",(req,res)=>{
    return res.send("Yay, app is working!")
})

router.post("/user/register", UserController.register);

router.post("/user/login", UserController.login);


module.exports=router;