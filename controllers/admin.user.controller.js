const AdminUserService=require("../services/admin.user.service");
const adminUserService=new AdminUserService;

class AdminUserController{
    async register(req,res){
        const {name,pwd}=req.body
        if (typeof name!="string" || typeof pwd!="string"){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        const result=await adminUserService.register(name,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
    }

    async log(req,res){
        const {name,pwd}=req.body;
        if (typeof name!="string" || typeof pwd!="string"){
            res.statu(400);
            return res.json({message:"Login information is invalid"})
        }

        const result= await adminUserService.login(name,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
        
    }

}

module.exports=AdminUserController;