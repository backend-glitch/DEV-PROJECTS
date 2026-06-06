import express from "express";
import User from "../models/user.models.js";


export const getUserForSidebar = async(req,res) => {

    try{

    const loggedInUserId = req.user.id;

    const filteredUsers = await User.find({ id : { $ne : loggedInUserId}}).select("-password");

    res.status(200).json(filteredUsers);

}catch(error){

    res.status(500).json({error : error.messsage});
}

}