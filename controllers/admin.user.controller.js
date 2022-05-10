const AdminUserService=require("../services/admin.user.service");
const adminUserService=new AdminUserService;

class AdminUserController{

    // get all admin user data
    async getAll(req,res){
        const result=await adminUserService.getAll();
        res.status(result.status);
        return res.json({data:result.data,message:result.message});
    };

    // create a new admin user
    async register(req,res){
        const {email,pwd}=req.body
        // check that data is valid format or is not an empty string
        if (typeof email!="string" || typeof pwd!="string" || email==="" || pwd===""){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        //---------------Can comment out section to remove checks for debugging--------------------
       const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

        if (!emailRegex.test(email)) {
            res.status(400);
            return res.json({message:"Invalid email address"});
        }

        //can also add in checks for password complexity 

        //------------------------------------------------------------------------------------------

        // send data to ORM service layer
        const result=await adminUserService.register(email,pwd);
        res.status(result.status);
        return res.json({message:result.message});
    };

    // login an existing admin user
    async login(req,res){
        const {email,pwd}=req.body;
        // check that data is valid format or is not an empty string
        if (typeof email!="string" || typeof pwd!="string" || email==="" || pwd===""){
            res.status(400);
            return res.json({message:"Login information is invalid"})
        }

        // send data to ORM service layer
        const result= await adminUserService.login(email,pwd);
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
        
    }

    async delete(req,res) {
        const targetAdminId = parseInt(req.params.adminId);

        if (typeof targetAdminId !== "number") {
            res.status(400); //bad reqest 
            return res.json({message: "Invalid Admin ID"});
        }

        //consume service layer
        const result = await adminUserService.delete(targetAdminId);

        // return serive data
        res.status(result.status);
        return res.json({message: result.message});

    }

}

module.exports=AdminUserController;