import Note from "../models/note.models.js";

export const createNote = async(req,res) => {

    try{

        const {
            title,
            content,
            tags,
            level
        } = req.body;

        if(!title || !content) return res.status(400).json({message : "title and content are required"});

        const note = await Note.create({
            user : req.user.id,
            title,
            content,
            tags,
            level
        });

     //   res.json("note created")
      res.status(201).json({message : "note created",note});

    }catch(error){

        res.status(500).json({message : error.message});
    }
}

export const getNote = async(req,res) => {

    try{

        const notes = await Note.find({
            user : req.user.id
        }).sort({ createdAt : -1});
   
   res.status(200).json(notes);
   
    }catch(error){

        res.status(500).json({message : error.message})
    }
}