const {User, RefreshToken, AdminUser} = require("../models");
const authConfig = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class AuthService{

    async refresh(refreshToken) {

        let result = {
            message: null,
            status: null,
            accessToken: null,
            refreshToken: null,
        };

        const tarRefreshToken = await RefreshToken.findOne({
            where: {token: refreshToken}
        })

        if(!tarRefreshToken) {
            result.message = "Refresh token is not in database.";
            result.status = 403;
            return result;
        }

        if (RefreshToken.verifyExpiration(tarRefreshToken)) {
            RefreshToken.destroy({where: {id: tarRefreshToken.id}});

            result.message = "Refresh token has expired. Please login again.";
            result.status = 403;
            return result;
        }
        // create userInfo obj to do jwt access token
        let userInfo = {
            id: null,
            email: null,
            role: null,
        }


        // check if use is admin or normal user
        if (tarRefreshToken?.adminId !== null) {
            const tarUser = await AdminUser.findOne({where:{adminID: tarRefreshToken.adminId}});
            userInfo.id = tarUser.adminID;
            userInfo.email = tarUser.adminEmail;
            userInfo.role = tarUser.adminRole;

        } else {
            const tarUser = await User.findOne({where:{userID: tarRefreshToken.userId}});
            userInfo.id = tarUser.userID;
            userInfo.email = tarUser.userEmail;
            userInfo.role = "user";
        }
        
        let newAccessToken = jwt.sign(userInfo, authConfig.secret, {expiresIn: authConfig.jwtExpiration});

        result.message = "New access token issued";
        result.status = 200;
        result.accessToken = newAccessToken;
        result.refreshToken = refreshToken.token;

        return result;
    }
}

module.exports = AuthService;