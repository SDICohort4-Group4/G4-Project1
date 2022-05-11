const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/item.controller");
const itemController = new ItemController;

// check routing is working
// router.get("/item",(req,res)=>{
//     return res.send("Item route is working!")
// })

router.get("/item", itemController.getAll);

router.get("/item/:sku", itemController.getBySku);

router.post("/item/add", itemController.addItem);

router.put("/item/:sku", itemController.updateItem);

module.exports = router;