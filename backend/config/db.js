const mongoose = require('mongoose');

const connectDB = async () => {



    try {
        const uri = process.env.mongo_uri;

        await mongoose.connect(uri, {

            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log("Database Connected successfully")

    }
    catch (err) {
        console.error("Database connection failed")
        process.exit(1);

    }
}


module.exports = connectDB;