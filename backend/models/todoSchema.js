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
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const Todo = mongoose.model('todo', todoSchema)
module.exports = Todo