const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const {TokenExpiredError} = jwt;

// load key for hashing from authConfig file

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        // error 403 if no token found in header
        return res.status(403).json({
            message: "No token provided"
        });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
            // invalid token
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({
                    message: "Unauthorized, Access Token has expired."
                })
            }

            if (err) {
                return res.status(401).json({
                    message: "Invalid token"
                });
            }       
            req.user = decoded.email;
            req.role = decoded.role;
            next();
        }
    )
}

module.exports = verifyJWT