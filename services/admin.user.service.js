const bcrypt=require("bcrypt");
const saltRounds=10;
const jwt=require("jsonwebtoken");
const {AdminUser}=require("../models")


class AdminUserService{

    // retrieve all admin user data from the database
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

    // create a new admin user
    async register(email,pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };

        // search the db and find whether the user email already exists
        const checkUser= await AdminUser.findOne({where:{adminEmail:email}});
        if (checkUser!==null){
            result.message=`User: ${email} already exists, please use another Email `;
            result.status=400;
            return result;
        }

        // hash the password before storing in database
        const pwdHashed= await bcrypt.hash(pwd,saltRounds);
        // create the record in db
        await AdminUser.create({adminEmail:email,adminPwd:pwdHashed})
        result.message="Account successfully created";
        result.status=200;
        return result;
    };

    //login in existing admin user
    async login(email,pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };
        //for use in jwttoken as it requires a standard JSON object
        let userInfo={
            id:null,
            email:null,
            pwd:null,
        }

        // check whether user exists in db
        const checkUser=await AdminUser.findOne({where:{adminEmail:email}});
        if (checkUser===null){
            result.message=`User: ${email} does Not exist, please use another Email `;
            result.status=400;
            return result;
        }

        // verify hashed password
        const hashcompare= await bcrypt.compare(pwd,checkUser.adminPwd);
        if (!hashcompare) {
            result.message="Incorrect Password";
            result.status=401;
            return result;
        }

        // assign user data to standard JSON object for json web token creation
        userInfo.id=checkUser.adminID;
        userInfo.email=checkUser.adminEmail;
        userInfo.pwd=checkUser.adminPwd

        //create json web token and return data
        const token=jwt.sign(userInfo,"123",{expiresIn:"1h"});
        result.data=token;
        result.message="Login Success";
        result.status=200;
        return result;

    };

}

module.exports=AdminUserService;