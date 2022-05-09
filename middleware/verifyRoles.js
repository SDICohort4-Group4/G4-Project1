const verifyRoles = (role) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401); 
        console.log(role);
        console.log(req.role);

        if(role != req.role) return res.sendStatus(401);

        next()
    }
}

module.exports = verifyRoles;