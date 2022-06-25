const {DataTypes, Model} = require ("sequelize");
const config = require("../config/auth.config.js");
const { v4: uuidv4 } = require("uuid");

module.exports = function(sequelize){
  class RefreshToken extends Model{}

  RefreshToken.init(
        {
            token: {
                type: DataTypes.STRING,
            },
            expiryDate: {
                type: DataTypes.DATE,
            },
            
        },
        {
            sequelize,
            modelName: "RefreshToken",
            // table name is auto set to RefreshTokens
        }
    );
    
    RefreshToken.createToken = async function(user) {
        let expireAt = new Date();
        // create the expireAt to current time and add expiration time to it
        expireAt.setSeconds(expireAt.getSeconds() + config.jwtRefreshExpiration);
        let _token = uuidv4();

        let refreshToken = await RefreshToken.create({
            token: _token,
            userId: user.id,
            expiryDate: expireAt.getTime(),
        });

        return refreshToken;
    };

    RefreshToken.verifyExpiration = (token) => {
        // functions takes in a token and check if expiry date is valid
        return token.expiryDate.getTime() < new Date().getTime();
    };
    
    return RefreshToken;
}



