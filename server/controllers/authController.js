import User from '../models/userModel.js'


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



export {singup}