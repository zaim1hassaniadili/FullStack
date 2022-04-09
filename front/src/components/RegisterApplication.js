import * as React from 'react';
import {
    Alert,
    Button,
    Snackbar,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextareaAutosize } from '@material-ui/core';


export default function RegisterApplication() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };


    const history = useHistory();

    let stock = localStorage.getItem("data");
    let update = localStorage.getItem("update")
    let stocking = JSON.parse(stock);

    const routeChange = () => {
        let path = `/`;
        history.push(path);
    }

    const routeChangeAdmin = () => {
        localStorage.removeItem("update");
        let path = `admin`;
        history.push(path);
    }


    const [formData, updateFormData] = useState(null);

    const handleChange = (e) => {

        if(update){
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
        }else{
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
                role:2
            }); 
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if(!update){
            setOpen(true);
            fetch("http://localhost:5000/job_application", {
                headers: myHeaders,
                method: 'post',
                body: JSON.stringify(formData)
            }).then(response => {
                    return response.json();
            })

        }else{
            fetch("http://localhost:5000/job_application/"+update, {
                headers: myHeaders,
                method: 'put',
                body: JSON.stringify(formData)
            }).then(response => {
                    return response.json();
            })
            routeChangeAdmin();

        }
       
      
       
    }


    return (
        <div className="registerMain">


            <h1>{"Enter Your Job Application"}</h1>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    ApplicationJob Create With Success !
                </Alert>
            </Snackbar>

            <form className="registerMain_form" onSubmit={handleSubmit}>

                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="email"
                    label="email"
                    type="email"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="lastName"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="firstName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="birthday"
                    type="date"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextareaAutosize
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="motivation"
                    label="Motivation"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />

                <div className="registerMain_buttons">

                    <Button onClick={(stocking !== null && stocking[0].role === 1) ? routeChangeAdmin : routeChange}>Back</Button>
                    <Button onClick={handleSubmit} autoFocus> {update?"UPDATE":"CREATE"}</Button>

                </div>
            </form>
        </div>



    );
}

