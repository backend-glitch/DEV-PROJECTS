import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protect = async(req,res,next) => {

    try{

        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({error : error.message});

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({ error : error.message});

        const user = await User.findById(decoded.userId).select("-password");
        // remove the password before return

        if(!user) return res.status(404).json({error : "user not found"});;

        req.user = user;

        next();




    }catch(error){
        console.log("error in protectRoute :",error.message);
        res.status(500).json({error : error.message});

    }
}

export default protect;