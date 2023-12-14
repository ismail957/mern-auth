import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: false
    }
}, {timestamps: true});

userSchema.methods.generateAuthToken = function() {
    const user = this;

    const token = bcrypt.sign({
        _id: user._id
    }, process.env.SECRET_KEY).toString();

    user.save();

    return token;
}

userSchema.pre("save", function (next) {
    const user = this;
    const hashedPassword = bcrypt.hashSync(user.password, 12);

    user.password = hashedPassword;
    
    next();  
})

userSchema.statics.findUserByCredentials = async function (email, password) {
    const user = this;

    // return await User.findOne({email: email}).then((user) => {
    //     if (!user) {
    //         Promise.reject();
    //     } else {
    //         return new Promise((resolve, reject) => {
    //             bcrypt.compare(password, user.password, (err, res) => {
    //                 if(res) {
    //                     resolve(user);
    //                 } else {
    //                     reject(err);
    //                 }
    //             })
    //         })
    //     }
    // })


    const validatedUser = await user.findOne({email});
    if(!validatedUser){
        resolve()
        next(errorHandler(404, 'Use not found!'))
    }

    const validatePassword = bcrypt.compareSync(password, validatedUser.password)
    if(!validatePassword){
        next(errorHandler(401, 'Wrong credentials!'))
    }

    const token = jwt.sign({id: validatedUser._id}, process.env.SECRET_KEY)
    const data = {validatedUser, token};
    return data;

}
const User = mongoose.model('User', userSchema)

export default User