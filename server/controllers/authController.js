import { hash } from 'bcrypt'
import User from '../models/userModel.js'


const singup = async (req, res) => {
    const {username, email, password} = req.body 
    const hashed = hash(password, 12);
    const newUser = new User({username, email, password: hashed})
    
    try {
        newUser.save();
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
        res.status(501).json({
            seccusse: false,
            error: error.message,
            statusCode: error.statusCode
        })
    }
}

export {singup}