const bcrypt=require("bcrypt");
const saltRounds=10;
const jwt=require("jsonwebtoken");
const {User}=require("../models")

class UserService{

    async getAll(){
        let result={
            message:null,
            status:null,
            data:null,
        };
        const getAllUsers= await User.findAll();
        result.message="All users retrieved";
        result.data=getAllUsers;
        result.status=200;
        return result;
    };

    async register(email,pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };

        const checkUser= await User.findOne({where:{userEmail:email}});
        if (checkUser!==null){
            result.message=`User: ${email} already exists, please use another Email `;
            result.status=400;
            return result;
        }

        const pwdHashed= await bcrypt.hash(pwd,saltRounds);
        await User.create({userEmail:email,userPwd:pwdHashed})
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
            pwd:null,
        }

        const checkUser=await User.findOne({where:{userEmail:email}});
        if (checkUser===null){
            result.message=`User: ${email} does Not exist, please use another Email `;
            result.status=400;
            return result;
        }

        const hashcompare= await bcrypt.compare(pwd,checkUser.userPwd);
        if (!hashcompare) {
            result.message="Incorrect Password";
            result.status=401;
            return result;
        }

        userInfo.id=checkUser.userID;
        userInfo.email=checkUser.userEmail;
        userInfo.pwd=checkUser.userPwd;

        const token=jwt.sign(userInfo,"123",{expiresIn:"1h"});
        result.data=token;
        result.message="Login Success";
        result.status=200;
        return result;

    };

}

module.exports=UserService;