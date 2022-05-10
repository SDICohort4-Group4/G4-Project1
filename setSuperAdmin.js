const bcrypt=require("bcrypt");
const saltRounds=10;
const { AdminUser } = require("./models");


(async ()=>{

    // Create superuser
    let superAdmin = await AdminUser.findOne({where:{adminEmail:"SuperAdmin", adminRole:"superAdmin"}});

    if(!superAdmin) {
        const pwd = "password"
        const pwdHashed= await bcrypt.hash(pwd,saltRounds);

        await AdminUser.create({
            adminEmail:"SuperAdmin",
            adminPwd:pwdHashed,
            adminRole:"superAdmin"
        });
    }
    
})();