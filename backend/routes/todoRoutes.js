const {Router} = require('express')
const { getTodos, newTodo, deleteTodo, updateTodo, completeTodo } = require('../controllers/TodoController')
const router = Router()

router.get('/list',getTodos)
router.post('/create-todo',newTodo)
router.delete('/delete-todo/:id',deleteTodo)
router.put('/update-todo/:id',updateTodo)
router.post('/complete-todo/:id',completeTodo)

module.exports = router 