const AdminUserService = require("../services/admin.user.service");
const adminUserService = new AdminUserService;

class AdminUserController{

    // get all admin user data
    async getAllAdmin(req,res){
        const result = await adminUserService.getAllAdmin();

        res.status(result.status);

        return res.json({
            message: result.message,
            data: result.data
        });
    };

    // create a new admin user
    async registerAdmin(req,res){
        const {email, name, role, pwd} = req.body;
        // check that data is valid format or is not an empty string
        // check that role is correctly set to either "admin" or "superAdmin"
        if (typeof email != "string" || typeof pwd != "string" || email === "" || pwd === "" || (role != "admin" && role != "superAdmin")){
            res.status(400);

            return res.json({
                message: "Registration information is invalid"
            })
        }

        //---------------Can comment out section to remove checks for debugging--------------------
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

        if (!emailRegex.test(email)) {
            res.status(400);

            return res.json({
                message: "Invalid email address"
            });
        }

        //can also add in checks for password complexity 

        //------------------------------------------------------------------------------------------

        //we can get the role of the user by calling req.role
        const loginRole = req.role;

        // make sure that admin cannot create super admin
        if (loginRole != 'superAdmin' && role == 'superAdmin') {
            res.status(400);

            return res.json({
                message: "Only Super Admin can create new Super Admin accounts"
            });
        }

        // send data to ORM service layer
        const result = await adminUserService.registerAdmin(email, name, role, pwd);

        res.status(result.status);

        return res.json({
            message: result.message
        });
    };

    // login an existing admin user
    async loginAdmin(req,res){
        const {email, pwd} = req.body;
        
        // check that data is valid format or is not an empty string
        if (typeof email != "string" || typeof pwd != "string" || email === "" || pwd === ""){
            res.status(400);

            return res.json({
                message: "Login information is invalid"
            })
        }

        // send data to ORM service layer
        const result= await adminUserService.loginAdmin(email, pwd);

        res.status(result.status);
        res.set({
            'x-access-token': result.accessToken,
            'x-refresh-token': result.refreshToken
        });

        return res.json({
            message: result.message,
        });
    }

    async deleteAdmin(req,res) {
        const targetAdminId = parseInt(req.params.adminId);

        if (typeof targetAdminId !== "number") {
            res.status(400); //bad reqest 

            return res.json({
                message: "Invalid Admin ID"
            });
        }

        //consume service layer
        const result = await adminUserService.deleteAdmin(targetAdminId);

        // return service data
        res.status(result.status);
        
        return res.json({
            message: result.message
        });
    }

    async updatePwdAdmin(req, res) {
        // retrieve data from request body
        const {currentPwd, newPwd, userEmail} = req.body;
        const loginUser = req.user;
        const loginRole = req.role;

        if (!currentPwd || !newPwd) {
            res.status(400); //bad reqest 
            return res.json({message: "Current Password and new password cannot be empty"});
        }

        // if userEmail is provided and it is different user from the logged in user.
        if (userEmail != loginUser && loginRole != 'superAdmin') {
            res.status(400); //bad reqest 
            return res.json({message: "Only super admin can change password of others"});
        }
        // if no userEmail input or input same as loginEmail (meaning changing of own password)
        if (!userEmail || userEmail == loginUser) {
            //send in current pwd ,new pwd and the email from jwt token into service layer
            const result = await adminUserService.updatePwdAdmin(currentPwd, newPwd, loginUser);
            //return service data
            res.status(result.status);
            return res.json({message: result.message});
        }

        //send in current pwd ,new pwd and userEmail from input into service layer
        const result = await adminUserService.updatePwdAdmin(currentPwd, newPwd, userEmail);
        //return service data
        res.status(result.status);
        return res.json({message: result.message});
    }

}

module.exports = AdminUserController;