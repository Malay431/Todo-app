const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupController = async(req,res)=>{
    const {name, email, password} = req.body
    const isUser = await User.findOne({email})

    if(isUser){
        return res.status(400).json({message:'User Already Exists'})
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({name, email, password:hashPassword})
    const token = await jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
    return res.status(200).json({message:'User Created Successfully', token})
}

const loginController = async(req, res)=>{
    const {email, password} = req.body
    const isUser = await User.findOne({email})
    if(!isUser){
        return res.status(400).json({message:'User Not Found'})
    }

    const isPassword = await bcrypt.compare(password, isUser.password)
    if(!isPassword){
        return res.status(400).json({message:'Incorrect Password'})
    }

    const token = await jwt.sign({id:isUser._id, name:isUser.name}, process.env.JWT_SECRET, {expiresIn:'1d'})
    return res.status(200).json({message:'Login Successful', token})
}

module.exports = {signupController, loginController}