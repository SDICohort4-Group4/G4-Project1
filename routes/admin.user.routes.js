const express = require("express");
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const AdminUserController=require("../controllers/admin.user.controller");
const adminUserController= new AdminUserController();

// check routing is working
// router.get("/admin",(req,res)=>{
// return res.send("Admin Route is working");


router.post("/admin/login", adminUserController.login);

router.use(verifyJWT); //use verifyJWT middleware after login since login should not require 

router.get("/admin", verifyRoles('admin', 'superAdmin'), adminUserController.getAll);

router.post("/admin/register", verifyRoles('admin', 'superAdmin'), adminUserController.register);

router.delete("/admin/:adminId", verifyRoles('superAdmin'), adminUserController.delete);

module.exports=router;