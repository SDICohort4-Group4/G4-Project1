const verifyRoles = (...roles) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401); 
        rolesArr = [...roles];

        console.log(rolesArr);
        console.log(req.role);

        result = rolesArr.some(role => role == req.role);
        if(!result) return res.sendStatus(401);

        next();
    }
}

module.exports = verifyRoles;