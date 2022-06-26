const verifyRoles = (...roles) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401); 
        
        rolesArr = [...roles];
        result = rolesArr.some(role => role == req.role);
        if(!result) return res.status(403).send({
            message: "Not enough privilege."
        });

        next(); 
    }
}

module.exports = verifyRoles;