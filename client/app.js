import React, { useState } from "react";
import {createRoot} from 'react-dom/client';
import styles from './app.module.css';
import axios from 'axios';

const App = ()=>{
     
    const[email,setEmail] = useState("");
    const[subject,setSubject] = useState("");
    const[text,setText] = useState("");
    const[status,setStatus] = useState("");

    const handleEmail = (e)=>{
        setEmail(e.target.value);
        
    }

    const handleSubject = (e)=>{
        setSubject(e.target.value);
     
    }

    const handleText = (e)=>{
        setText(e.target.value);
       
    }

    const handleSubmit = async() =>{
        const data = {email,subject,text};
        try{
            const res = await axios.post("http://localhost:3030/sendMail",data);
            setStatus("Mail sent Successfully");
            setEmail("");
            setSubject("");
            setText("");

        }
        catch(err){
            console.log(err.message);
            setStatus("Can't Sent Mail");
        }
    }

    return(<>
    <div className={styles.head}>
        The Mail Application
        <p>Status:{status}</p>
    </div>
    <div className={styles.mailer}>
    <div className={styles.container}>
        <input type='text' placeholder="Receiver Email" onChange={(e)=>{handleEmail(e)}}></input>
        <input type = 'text' placeholder="Subject" onChange={(e)=>{handleSubject(e)}}></input>
        <textarea placeholder="Message" onChange={(e)=>{handleText(e)}}></textarea>
        <button onClick={handleSubmit}>Submit</button>
    </div>
    </div>
    </>)
}

const root = createRoot(document.getElementById("root"));
root.render(<App/>);
