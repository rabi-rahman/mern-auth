import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res) => {
    res.json({
        message : 'API is perfect'
    })
}

export const updateUser = async (req,res,next) => {
    if (req.user.id !== req.params.id){
        next(errorHandler(401,'You can update your account only'))
    }
    try {
        if(req.body.password){
        const password = bcryptjs.hashSync(req.body.password, 10); 
        }

        const updatedUser = await User.findByIdAndUpdate(
        req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilepicture: req.body.profilepicture,
            }
        },{new:true}
    );
    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}