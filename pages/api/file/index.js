// pages/api/file/index.js
import { IncomingForm } from 'formidable'
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new IncomingForm();
  const data = await new Promise((res,rej)=>form.parse(req, (err, fields, files) => {
    if (err) rej(err);
    res({ fields, files });
   

    console.log(files);
    }));

    saveFile(data?.files?.file[0])

 //   const { fields, files } = data;
  //  await saveFile(files.file);
//    return res.status(201).send("");
/*
   const contents = await fs.readFile(data?.files?.file[0].filepath,(err, data) =>{
        if (err) throw err;
        console.log(data);
   });
  */ 
   return res.status(201).send("");


};

const saveFile = async (file) => {
  console.log(file.filepath)
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.newFilename+file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
