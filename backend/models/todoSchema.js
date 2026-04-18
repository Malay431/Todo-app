const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
})

const Todo = mongoose.model('todo', todoSchema)
module.exports = Todo