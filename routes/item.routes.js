const express = require("express");
const router=express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const ItemController = require("../controllers/item.controller");
const itemController = new ItemController;

// check routing is working
// router.get("/item",(req,res)=>{
//     return res.send("Item route is working!")
// })

router.get("/item/:property?/:value?", itemController.getByItem)

// can remove verifyJWT and verifyRoles middleware 
router.post("/item/add", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.addItem);

router.put("/item/update/:sku", itemController.updateItem);

router.get("/admin/item/:property?/:value?", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetByItem)

module.exports = router;