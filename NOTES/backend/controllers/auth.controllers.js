import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.utils.js";

export const signUp = async(req,res) => {

    try{
        const {fullName, email, password } = req.body;

        if(!fullName || !email || !password) return res.status(400).json({message : "All fields are required"});

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).status({message : "user already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password : hashedPassword
        });

        res.status(201).json({message : "User account created ", user});


    }catch(error){

        return res.status(500).json({message : error.message});

    }
}



export const Login = async(req,res) => {

    try{

        const {email , password} = req.body;

        if(!email || !password) return res.status(400).json({message : "all fields are required"});

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message : "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({message : "Invalid credentials"});

        res.status(200).json({message : "Login successfull", token : generateToken(user.id), user : {id : user.id,fullName : user.fullName,email: user.email}});


    }catch(error){

        return res.status(500).json({message : error.message});
    }
}