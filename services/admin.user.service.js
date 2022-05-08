const bcrypt=require("bcrypt");
const saltRounds=10;
const jwt=require("jsonwebtoken");
const {AdminUser}=require("../models")


class AdminUserService{
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
        await AdminUser.create({adminName:name,pwd:pwdHashed})

    }

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

        const hashcompare= await bcrypt.compare(pwd,checkUser.pwd);
        if (!hashcompare) {
            result.status=401;
            result.message="Incorrect Password";
            return result;
        }

        userInfo.id=checkUser.adminID;
        userInfo.name=checkUser.userName;
        userInfo.pwd=checkUser.pwd

        const token=jwt.sign(userInfo,"123",{expiresIn:"1h"});
        result.data=token;
        result.message="Login Success";
        result.status=200;
        return result;

    }

}

module.exports=AdminUserService;