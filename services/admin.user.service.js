const bcrypt=require("bcrypt");
const saltRounds=10;
const jwt=require("jsonwebtoken");
const {AdminUser}=require("../models")


class AdminUserService{
    async getAll(){
        let result={
            message:null,
            status:null,
            data:null,
        };
        const getAllAdmins= await AdminUser.findAll();
        result.message="All Admin user data retrieved";
        result.data=getAllAdmins;
        result.status=200;
        return result;
    };

    async register(email,pwd){
        let result={
            message:null,
            status:null,
        };

        const checkUser= await AdminUser.findOne({where:{adminEmail:email}});
        if (checkUser!==null){
            result.message=`User: ${email} already exists, please use another Email `;
            result.status=400;
            return result;
        }

        const pwdHashed= await bcrypt.hash(pwd,saltRounds);
        await AdminUser.create({adminEmail:email,adminPwd:pwdHashed})
        result.message="Account successfully created";
        result.status=200;
        return result;
    };

    async login(email,pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };
        //for use in jwttoken as it requires a standard JSON
        let userInfo={
            id:null,
            email:null,
            role: null
        }

        const checkUser=await AdminUser.findOne({where:{adminEmail:email}});
        if (checkUser===null){
            result.message=`User: ${email} does Not exist, please use another Email `;
            result.status=400;
            return result;
        }

        const hashcompare= await bcrypt.compare(pwd,checkUser.adminPwd);
        if (!hashcompare) {
            result.message="Incorrect Password";
            result.status=401;
            return result;
        }

        userInfo.id = checkUser.adminID;
        userInfo.email = checkUser.adminEmail;
        userInfo.role = checkUser.adminRole;

        const token=jwt.sign(userInfo,"123",{expiresIn:"1h"});
        result.data=token;
        result.message="Login Success";
        result.status=200;
        return result;

    };

    async delete(adminId) {
        let result={
            message:null,
            status:null,
        }

        const targetAdmin = await AdminUser.findByPk(adminId)

        if(!targetAdmin) {
            result.message = `Admin ID ${adminId} does not exist.`;
            result.status = 404;
            return result;
        }

        if(targetAdmin.adminRole === "superAdmin") {
            result.message = 'Super Admin cannot be deleted';
            result.status = 403;
            return result;
        }

        await AdminUser.destroy({where: {adminID: adminId}});
        result.status = 200;
        result.message = `Admin ID ${adminId} has been deleted`
        return result;
    }
}

module.exports=AdminUserService;