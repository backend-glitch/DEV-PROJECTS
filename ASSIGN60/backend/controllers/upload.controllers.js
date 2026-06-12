import texttoPdf from "../services/pdf.services.js";

export const  uploadPdf = async(req,res) => {

    try{

        console.log(req.file);
        
    const data = await texttoPdf(req.file.buffer);

    res.json({
        success: true,
        message  : "file parsed successfully",
        data,
    });

}catch(error){

    console.log(error);

    res.status(500).json({error : error.message});
}

}

