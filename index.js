const app = require("./routes");

const PORT=process.env.PORT||3000;

app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}...`);
    //require("./setSuperAdmin.js")
});