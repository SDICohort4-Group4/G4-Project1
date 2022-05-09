const UserService=require("../services/user.service");
const userService=new UserService;

class UserController{

    // get all user data
    async getAll(req,res){
        const result=await userService.getAll();
        res.status(result.status);
        return res.json({data:result.data,message:result.message});
    };

    // create a new user
    async register(req,res){
        const {email,pwd}=req.body
        // check that data is valid format or is not an empty string
        if (typeof email!="string" || typeof pwd!="string" || email==="" || pwd===""){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        // send data to ORM service layer
        const result=await userService.register(email,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
    };

    // login an existing user
    async login(req,res){
        const {email,pwd}=req.body;
        // check that data is valid format or is not an empty string
        if (typeof email!="string" || typeof pwd!="string" || email==="" || pwd===""){
            res.statu(400);
            return res.json({message:"Login information is invalid"})
        }

        // send data to ORM service layer
        const result= await userService.login(email,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
        
    }

}

module.exports=UserController;