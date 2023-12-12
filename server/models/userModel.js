import mongoose from "mongoose";
import jwt from 'bcrypt';
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

    const token = jwt.sign({
        _id: user._id
    }, process.env.SECRET_KEY).toString();

    user.save();

    return token;
}

const User = mongoose.model('User', userSchema)

export default User