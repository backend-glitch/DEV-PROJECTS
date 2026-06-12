import { response } from "express";
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

export const deleteNote = async(req,res) => {

    try{

        const note = await Note.findById(req.params.id);

        if(!note) return res.status(404).json({message : "Note not found"});

        // check ownership
        if(note.user.toString() !== req.user.id.toString()) return res.status(401).json({message : "Not authorized"});

        await note.deleteOne();

        res.status(200).json({message : "Note deleted successfully"});


    } catch(error){

        res.status(500).json({message : error.message})
    }
}

export const updateNote = async(req,res) => {

    try{

        const{title,
            content,
            tags,
            level,
            isPinned
        } = req.body;

        const note = await Note.findById(req.params.id);

        if(!note) return res.status(404).json({message : "Note not found"});

        if(note.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({message : "Not authorized"});
        }

           note.title = title || note.title;
        note.content = content || note.content;
        note.tags = tags || note.tags;
        note.level = level || note.level;

        // boolean handling
        if (typeof isPinned === "boolean") {
            note.isPinned = isPinned;
        }

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

export const togglePinNote = async (req, res) => {

    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }


        if (note.user.toString() !== req.user._id.toString()) {

            return res.status(401).json({
                message: "Not authorized"
            });

        }

        // toggle pin
        note.isPinned = !note.isPinned;

        await note.save();

        res.status(200).json({
            message: note.isPinned
                ? "Note pinned"
                : "Note unpinned",

            note
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const searchNotes = async(req,res) => {

    try{

        const query = req.query.query;

        if(!query) return res.status(400).json({message : "search query required"});

        const notes = Note.find({

            user : req.user.id,

            $or : [
                {
                    title : {
                        $regex : query,
                        $options : "i"
                    }
                },

                {
                    content : {
                        $regex : query,
                        $options : "i"
                    }
                },
                {
                    tags : {
                        $regex : query,
                        $options : "i"
                    }
                }
            ]
        });

        res.status(200).json(notes);
    }catch(error){

        res.status(500).json({message : error.message})
    }
}