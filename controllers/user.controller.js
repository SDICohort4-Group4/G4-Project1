const UserService = require("../services/user.service");
const userService = new UserService;

class UserController{

    // get all user data
    async getAllUser(req,res){
        const result = await userService.getAllUser();

        res.status(result.status);

        return res.json({
            message: result.message,
            data: result.data
        });
    };

    // create a new user
    async registerUser(req,res){
        const {email, name, nickname, pwd} = req.body

        // check that data is valid format or is not an empty string
        if (typeof email != "string" || typeof pwd != "string" || email === "" || pwd === ""){
            res.status(400);

            return res.json({
                message:"Registration information is invalid"
            })
        }

        // send data to ORM service layer
        const result = await userService.registerUser(email, name, nickname, pwd);

        res.status(result.status);

        return res.json({
            message: result.message,
            data: result.data
        });
    };

    // login an existing user
    async loginUser(req,res){
        const {email, pwd} = req.body;

        // check that data is valid format or is not an empty string
        if (typeof email != "string" || typeof pwd != "string" || email === "" || pwd === ""){
            res.status(400);

            return res.json({
                message:"Login information is invalid"
            })
        }

        // send data to ORM service layer
        const result = await userService.loginUser(email, pwd);

        res.status(result.status);
        res.set({
            'x-access-token': result.accessToken,
            'x-refresh-token': result.refreshToken
        });

        return res.json({
            message: result.message,
        });
    }

}

module.exports = UserController;