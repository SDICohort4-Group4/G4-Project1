// load key for hashing from common file
const fs = require("fs");
const privateKey = fs.readFileSync("./jwttest.key");

module.exports = {
    secret: privateKey,
    //jwtExpiration: 3600,           // 1 hour
    //jwtRefreshExpiration: 86400,   // 24 hours

    /* for test */
    jwtExpiration: 60,          // 1 minute
    jwtRefreshExpiration: 120,  // 2 minutes
  };