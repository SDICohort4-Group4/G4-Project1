const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const {User, RefreshToken} = require("../models");
const authConfig = require("../config/auth.config");

class UserService{

    // retrieve all user data from the database
    async getAllUser(){
        let result = {
            message:null,
            status:null,
            data:null,
        };

        const getAllUsers = await User.findAll();

        result.message = "All users retrieved";
        result.data = getAllUsers;
        result.status = 200;

        return result;
    };

    // create a new user
    async registerUser(email, name, nickname, pwd){
        let result={
            message:null,
            status:null,
            data:null,
        };

        // search the db and find whether the user email already exists conver email to lower case before
        const checkUser= await User.findOne({where:{userEmail:email.toLowerCase()}});

        if (checkUser !== null){
            result.message = `User: ${email} already exists, please use another Email `;
            result.status = 400;

            return result;
        }

        // hash the password before storing in database
        const pwdHashed = await bcrypt.hash(pwd,saltRounds);
        
        // create the record in db convert email to lower case before creating
        await User.create({
            userEmail: email.toLowerCase(), 
            userName: name, 
            userNickname: nickname, 
            userPwd: pwdHashed
        })

        result.message = "Account successfully created";
        result.status = 200;

        return result;
    };

    //login in existing user
    async loginUser(email, pwd){
        let result = {
            message: null,
            status: null,
            accessToken: null,
            refreshToken: null,
        };

        //for use in jwttoken as it requires a standard JSON object
        let userInfo = {
            id: null,
            email: null,
            role: "user",
        }

        // check whether user exists in db
        const checkUser = await User.findOne({where:{userEmail:email.toLowerCase()}});

        if (!checkUser){
            result.message = `User: ${email} does Not exist, please use another Email`;
            result.status = 404;
            return result;
        }

        // verify hashed password
        const hashcompare= await bcrypt.compare(pwd, checkUser.userPwd);

        if (!hashcompare) {
            result.message = "Incorrect Password";
            result.status = 401;

            return result;
        }

        // assign user data to standard JSON object for json web token creation
        userInfo.id = checkUser.userID;
        userInfo.email = checkUser.userEmail;

        //create json web token and return data
        const token = jwt.sign(userInfo, authConfig.secret, {expiresIn: authConfig.jwtExpiration});
        
        let refreshToken = await RefreshToken.createToken(checkUser);
        result.accessToken = token;
        result.message ="Login Success";
        result.status = 200;
        result.refreshToken = refreshToken.dataValues.token;

        return result;
    };

    async updateUser(userData, token){
        // userData is an object

        let result = {
            message: null,
            status: null,
            data: null,
        };

        // first decode the jwt
        let decoded = jwt.decode(token);

        //get the user from db
        const targetUser = await User.findByPk(decoded.id);

        //allowed list of keys
        let allowedKeys = new Set(["userName", "userNickname", "userEmail", "userAddress1", "userAddress2", "userPostalCode", "userCountry", "userCountryCode", "userPhoneNum"]);

        for (let key of Object.keys(userData)) {
            if (allowedKeys.has(key)) targetUser[key] = userData[key];
        }

        await targetUser.save();

        let data = {};

        // generate out data without certain keys
        for (let key of Object.keys(targetUser.dataValues)) {
            if (key != "createdAt" &&  key != "updatedAt" && key != "userPwd") {
                data[key] = targetUser.dataValues[key];
            }
        }

        result.status = 200;
        result.message = "Data updated successfully"
        result.data = data;
        return result;
    };

    async getInfo(token){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        // first decode the jwt
        let decoded = jwt.decode(token);
        
        const targetUser = await User.findByPk(decoded.id);

        if (!targetUser) {
            result.message = `Could not find user.`;
            result.status = 404;
            return result;
        }

        let data = {};

        // generate out data without certain keys
        for (let key of Object.keys(targetUser.dataValues)) {
            if (key != "createdAt" &&  key != "updatedAt" && key != "userPwd") {
                data[key] = targetUser.dataValues[key];
            }
        }
        
        result.status = 200;
        result.message = "Data retrieved";
        result.data = data;

        return result;
    }

}

module.exports = UserService;