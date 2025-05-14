const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
    origin:'http://localhost:1234',
    methods:['GET','POST'],
    credentials:true,
}));

app.post('/sendMail',async(req,res)=>{
    const {email,subject,text} = req.body;
    const receiver = email;
    const sub = subject;
    const msg = text;
    console.log(email,subject,text);

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SENDER,
            pass:process.env.PASSWORD,
        }
    });


    let mailOptions ={
        from:process.env.SENDER,
        to:receiver,
        subject:sub,
        text:msg,
    };


    try{
        let info = await transporter.sendMail(mailOptions);
        console.log("Mail sent");
        res.status(200).send("Mail sent Successfully");
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Can't Send");
    }
})

app.listen(3030,()=>{
    console.log("Server Running at 3030");
})
