const Todo = require("../models/todoSchema");

const getTodos = async (req, res) => {
  const user = req.user.name;
  const todoList = await Todo.find({ userId: req.user.id });
  return res.json({ todoList, user });
};

const newTodo = async (req, res) => {
  const { title, description } = req.body;
  const newTodo = await Todo.create({
    title,
    description,
    userId: req.user.id,
  });
  return res.json({ message: "Todo Created", newTodo, success: true });
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const isTodo = await Todo.find({ id });
  if (!isTodo) {
    return res.status(400).json({ message: "Todo Not Found" });
  }
  const todoDelete = await Todo.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ message: "Todo Deleted Successfully", success: true });
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const todoUpdate = await Todo.findByIdAndUpdate(id, { title, description });
    return res.json({ message: "Todo Update Successful", success: true });
  } catch (error) {
    return res.status(400).json({ message: "Error Occured", error });
  }
};

const completeTodo=async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const todo = await Todo.findById(id)
    if(!todo){
        return res.status(400).json({message:'Todo Not Found'})
    }
    try {
        const todoComplete = await Todo.findByIdAndUpdate(id,{isCompleted:!todo.isCompleted}, { new: true })
        return res.json({message:'Task Completed', todoComplete, success:true})
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = { getTodos, newTodo, deleteTodo, updateTodo, completeTodo };
