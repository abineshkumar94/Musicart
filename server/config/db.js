const mongoose = require('mongoose');

const connectWithDb = () => {
    mongoose.connect(process.env.DB_URL, {
       
    })

    .then(console.log(`DB Got Connected`))
    .catch(error => {
        console.log(`Db Connection Issues`);
        console.log(error);
        process.exit(1);
    })
}


module.exports = connectWithDb;