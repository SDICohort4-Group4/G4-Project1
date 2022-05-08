const UserService=require("../services/user.service");
const userService=new UserService;

class UserController{

    async getAll(req,res){
        const result=await userService.getAll();
        res.status(result.status);
        return res.json({data:result.data,message:result.message});
    };

    async register(req,res){
        const {name,pwd}=req.body
        if (typeof name!="string" || typeof pwd!="string" || name==="" || pwd===""){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        const result=await userService.register(name,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
    };

    async login(req,res){
        const {name,pwd}=req.body;
        if (typeof name!="string" || typeof pwd!="string" || name==="" || pwd===""){
            res.statu(400);
            return res.json({message:"Login information is invalid"})
        }

        const result= await userService.login(name,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
        
    }

}

module.exports=UserController;