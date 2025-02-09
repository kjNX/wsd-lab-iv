const mongoose = require('mongoose')
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log('MongoDB Connected')
    } catch (e) {
        console.error(e)
        throw new Error('Failed to connect to MongoDB')
    }
}

module.exports = {
    dbConnection
}