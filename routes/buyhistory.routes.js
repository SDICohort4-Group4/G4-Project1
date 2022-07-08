const express = require("express");
const router = express.Router();

const BuyHistoryController = require("../controllers/buyhistory.controller")
const buyHistoryController = new BuyHistoryController;

router.get("/buyhistory/:userid",buyHistoryController.getBuyHistoryByUserID);

router.post("/buyhistory/save",buyHistoryController.saveBuyHistory);

// delete is for testing/db cleanup
// router.put("/buyhistory/delete/:userid",buyHistoryController.deleteBuyHistory);

module.exports=router;