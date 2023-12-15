import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { errorHandler } from '../utils/error.js';
import bcrypt from  'bcrypt'


const singup = async (req, res, next) => {
    const {username, email, password} = req.body 
    const newUser = new User({username, email, password})
    
    try {
        await newUser.save();
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
        next(error)
    }
}

const singin = async(req, res, next) => {
    const {email,password} = req.body;

    console.log(req);
    
    try {
        
        const validateUser = await User.findOne({email});
        if(!validateUser){
            next(errorHandler(404, 'User not found!'))
        }

        const validatePassword = bcrypt.compareSync(password, validateUser.password)
        if(!validatePassword){
            next(errorHandler(401, 'Wrong credentials!'))
        }

        const {password: hashedPassword, ...rest} = validateUser._doc
        const token = jwt.sign({id: validateUser._id}, process.env.SECRET_KEY)

        const expiryData = new Date(Date.now() + 3600000); // 1 hour
        await res.cookie('access_token', token, {httpOnly: true, expires: expiryData})
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
}

export {singup, singin}