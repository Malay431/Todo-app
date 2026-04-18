const Todo = require('../models/todoSchema')

const getTodos = async(req,res)=>{
    const user = req.user.name
    const todoList = await Todo.find({userId:req.user.id})
    return res.json({todoList, user})
}

const newTodo = async(req,res)=>{
    const {title, description} = req.body
    const newTodo = await Todo.create({title, description, userId:req.user.id})
    return res.json({message:'Todo Created', newTodo})
}

module.exports = {getTodos, newTodo}