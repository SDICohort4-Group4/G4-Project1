const express = require("express");
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const AdminUserController=require("../controllers/admin.user.controller");
const adminUserController= new AdminUserController();

// check routing is working
// router.get("/admin",(req,res)=>{
// return res.send("Admin Route is working");


router.post("/admin/login", adminUserController.loginAdmin);

router.get("/admin", verifyJWT, verifyRoles('admin', 'superAdmin'), adminUserController.getAllAdmin);

router.post("/admin/register", verifyJWT, verifyRoles('admin', 'superAdmin'), adminUserController.registerAdmin);

router.put("/admin/update-password", verifyJWT, verifyRoles('admin', 'superAdmin'), adminUserController.updatePwdAdmin);

router.delete("/admin/:adminId", verifyJWT, verifyRoles('superAdmin'), adminUserController.deleteAdmin);

module.exports = router;