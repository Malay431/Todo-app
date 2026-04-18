const express = require('express')
const app = express()
require('dotenv').config()
const connectToDatabase = require('./lib/db')
const cors = require('cors')
const PORT = process.env.PORT || 8080
const authRouter = require('./routes/userRoutes')
const todoRouter = require('./routes/todoRoutes')
const authMiddleware = require('./middlewares/authMiddleware')
connectToDatabase()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/auth', authRouter)
app.use('/api/todo',authMiddleware,todoRouter)

app.listen(PORT, ()=>{
    console.log(`Server Started On Port : ${PORT}`)
})