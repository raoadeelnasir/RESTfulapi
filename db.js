const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/wikiDB', {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        console.log('Connection DB is succesfull');
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}
module.exports = connectDB;
