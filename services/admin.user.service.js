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

    async register(name,pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };

        const checkUser= await AdminUser.findOne({where:{adminName:name}});
        if (checkUser!==null){
            result.message=`User: ${name} already exists, please use another name `;
            result.status=400;
            return result;
        }

        const pwdHashed= await bcrypt.hash(pwd,saltRounds);
        await AdminUser.create({adminName:name,adminPwd:pwdHashed})
        result.message="Account successfully created";
        result.status=200;
        return result;
    };

    async login(name,pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };
        //for use in jwttoken as it requires a standard JSON
        let userInfo={
            id:null,
            userName:null,
            pwd:null,
        }

        const checkUser=await AdminUser.findOne({where:{adminName:name}});
        if (checkUser===null){
            result.message=`User: ${name} does Not exist, please use another name `;
            result.status=400;
            return result;
        }

        const hashcompare= await bcrypt.compare(pwd,checkUser.adminPwd);
        if (!hashcompare) {
            result.message="Incorrect Password";
            result.status=401;
            return result;
        }

        userInfo.id=checkUser.adminID;
        userInfo.name=checkUser.adminName;
        userInfo.pwd=checkUser.adminPwd

        const token=jwt.sign(userInfo,"123",{expiresIn:"1h"});
        result.data=token;
        result.message="Login Success";
        result.status=200;
        return result;

    };

}

module.exports=AdminUserService;