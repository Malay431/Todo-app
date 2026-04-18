const mongoose = require('mongoose')

const URL = process.env.MONGO_URI

const connectToDatabase = async()=>{
    await mongoose.connect(URL)
    console.log('MongoDB Connected Successfully')
}

module.exports=connectToDatabase