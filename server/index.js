const app = require ("./app");
const connectWithDb = require("./config/db");
require('dotenv').config();

//connecting with database //
connectWithDb();

app.listen(process.env.PORT, () => {
    console.log(`server got connected at port: ${process.env.PORT}`);
})