const AuthService = require("../services/auth.service");
const authService = new AuthService;

class AuthController{

    // get all user data
    async refresh(req,res){
        const refreshToken = req.headers["x-refresh-token"];

        if (refreshToken == null) {
            return res.status(403).json({message: "Refresh Token is required."})
        };

        // send data to ORM service layer
        const result = await authService.refresh(refreshToken);

        res.status(result.status);

        // reissue new token
        return res.json({
            message: result.message,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        });
    };

}

module.exports = AuthController;