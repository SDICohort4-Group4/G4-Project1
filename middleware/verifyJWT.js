const jwt = require('jsonwebtoken');

// load key for hashing from common file
const fs=require("fs");
const privateKey=fs.readFileSync("./jwttest.key");


const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) return res.sendStatus(401); // error 401 if no token found in header
    jwt.verify(
        token,
        privateKey, 
        (err, decoded) => {
            if (err) return res.status(401).send("invalid token"); //invalid token input
            console.log(decoded)
            req.user = decoded.email;
            req.role = decoded.role;
            
            next();
        }
    )
}

module.exports = verifyJWT