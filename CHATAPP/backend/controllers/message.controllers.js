import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";


export const  SendMessage = async(req,res) => {

//    res.json("message send");

try{
    const {message} = req.body;
    const {id : receiverId}  = req.params;

    const senderId = req.user.id;

   let conversation =  await Conversation.findOne({
        participants : {$all : [senderId, receiverId]}
    })

    if(!conversation) {
        conversation = await Conversation.create({
            participants : [senderId,receiverId]
        })
    }

    const newMessage  = new Message({
        senderId : senderId,
        receiverId  : receiverId,
        message : message,
    })

    if(newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([
    conversation.save(),
    newMessage.save()
]);

    res.status(201).json(newMessage);
    
}catch(error){
    res.status(500).json({
        error: error.message
    })
}


}


export const getMessages = async(req,res) => {

    try{

        const {id:userToChatId} = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            participants : { $all : [senderId,userToChatId]},
        }).populate("messages");

        if(!conversation ) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(conversation.messages);


    }catch(error){

        return res.status(500).json({error: error.message});
    }
}