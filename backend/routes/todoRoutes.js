const {Router} = require('express')
const { getTodos, newTodo } = require('../controllers/TodoController')
const router = Router()

router.get('/list',getTodos)
router.post('/create-todo',newTodo)

module.exports = router 