const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) return res.sendStatus(401); // error 401 if no token found in header
    jwt.verify(
        token,
        '123', //temp
        (err, decoded) => {
            if (err) return res.sendStatus(401); //invalid token input
            console.log(decoded)
            req.user = decoded.email;
            req.role = decoded.role;
            
            next();
        }
    )
}

module.exports = verifyJWT