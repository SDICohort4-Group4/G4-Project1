const express=require("express");
const router=express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const AdminUserController=require("../controllers/admin.user.controller");
const adminUserController= new AdminUserController();

// check routing is working
// router.get("/admin",(req,res)=>{
// return res.send("Admin Route is working");


router.post("/admin/login", adminUserController.login);

router.get("/admin", verifyJWT, verifyRoles('admin', 'superAdmin'), adminUserController.getAll);

router.post("/admin/register", verifyJWT, verifyRoles('admin', 'superAdmin'), adminUserController.register);

router.put("/admin/update-password", verifyJWT, verifyRoles('admin', 'superAdmin'), adminUserController.updatePwd);

router.delete("/admin/:adminId", verifyJWT, verifyRoles('superAdmin'), adminUserController.delete);

module.exports=router;