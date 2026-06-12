
import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

  const {name, email, password } = req.body;

  try {

    if(!name || !email || !password) return res.status(400).json({message : "all fields required !!"});
    
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully" });

   // console.log(req.headers.authorization);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      "JWT_SECRET",
      { expiresIn: "7d" }
    );

    res.json({user,token});

    console.log(user);
console.log(token);

    console.log(req.headers.authorization);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

