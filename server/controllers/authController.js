import User from '../models/userModel.js'


const singup = async (req, res) => {
    const {username, email, password} = req.body 
    const newUser = new User({username, email, password})
    
    try {
        await newUser.save();
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



export {singup}