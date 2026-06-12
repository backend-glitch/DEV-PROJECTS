import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log(pdf);

const texttoPdf = async(buffer) => {

    try{
    const data  =  await pdf(buffer);

    return data.text;

    }catch(error){

        console.log(error);
    }

}

export default texttoPdf;