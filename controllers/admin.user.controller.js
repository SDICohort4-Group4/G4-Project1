const AdminUserService=require("../services/admin.user.service");
const adminUserService=new AdminUserService;

class AdminUserController{

    async getAll(req,res){
        const result=await adminUserService.getAll();
        res.status(result.status);
        return res.json({data:result.data,message:result.message});
    };

    async register(req,res){
        const {email,pwd}=req.body
        if (typeof email!="string" || typeof pwd!="string" || email==="" || pwd===""){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        const result=await adminUserService.register(email,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
    };

    async login(req,res){
        const {email,pwd}=req.body;
        if (typeof email!="string" || typeof pwd!="string" || email==="" || pwd===""){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        const result= await adminUserService.login(email,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
        
    }

}

module.exports=AdminUserController;