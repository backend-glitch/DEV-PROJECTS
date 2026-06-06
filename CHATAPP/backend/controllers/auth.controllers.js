import  User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

export const signUp = async(req,res) => {
    try{
        const {fullName, username, password, confirmPassword,gender} = req.body;

        if(password !== confirmPassword) return res.status(400).json({error:  "Password doesnot match"})
    
      const user = await User.findOne({username});

      if(user) return res.status.json({error : "Username already exists"});

    const n = 10;

    const hashedpwd = await bcrypt.hash(password,n);



      const profilename = `https://ui-avatars.com/api/?background=random&name=${username}`;

      const newUser = new User({
        fullName,
        username,
        password : hashedpwd,
        confirmPassword,
        gender,
        profilePic : profilename
      })

      if(newUser){

      await generateToken(newUser._id,res);
      await newUser.save();

      res.status(201).json({message : "User Created", newUser});

      }else{
         
        res.status(400).json({error : "invalid data"});
      }

        } catch(error){

            return res.status(500).json({message : "signup failed", error : error.message});
        }
}


export const login = async(req,res) => {
    
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});

        if(!user) return res.status(404).json({message : "User not found"});

        const isPassword = await bcrypt.compare(password,user?.password || "");

        if(!isPassword) return res.status(404).json({error : "wrong password"});

        return res.status(200).json({messgae : "User Logined",token : generateToken(user._id,res), user });

    }catch(error){

        return res.status(500).json({error : error.message});
    }
}

export const logout = async(req,res) => {
    
    try{
        res.cookie("jwt","", {maxAge : 0});
        res.status(200).json({message : "Logged out"});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}