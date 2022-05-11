const express=require("express");
const router=express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const ItemController=require("../controllers/item.controller");
const itemController= new ItemController;

// check routing is working
// router.get("/item",(req,res)=>{
//     return res.send("Item route is working!")
// })

router.get("/item",itemController.getAll);

// can remove verifyJWT and verifyRoles middleware 
router.post("/item/add",verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.addItem);

module.exports=router;