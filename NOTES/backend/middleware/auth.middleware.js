import jwt from "jsonwebtoken";
import  User from "../models/user.models.js";

const protect = async(req,res,next) => {

    try{
        let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        token = req.headers.authorization.split(" ")[1];

        // verify
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // GET USER
        req.user = await User.findById(decoded.id).select("-password");

      //  res.json(req.user);

      //checking
     // res.json("middleware reached");
     console.log("middleware reached");
      console.log(token);

        next();

    }else{
      return res.status(401).json({
                message: "Not authorized, no token"
            });
    }

    }catch(error){

      console.log(error);

        return res.status(401).json({
            message: "Token failed"
    });
}

}

export default protect;
