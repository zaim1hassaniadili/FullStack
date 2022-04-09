import * as React from 'react';
import {
    Alert,
    Button,

    Snackbar,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./registersStyle.css"


export default function RegisterCompany() {

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
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
   
        if(!update){
            setOpen(true);
            fetch("http://localhost:5000/company", {
                headers: myHeaders,
                method: 'post',
                body:JSON.stringify(formData)
            })
                .then(response => {
                    return response.json();
            })
        }else{
          
           
            fetch("http://localhost:5000/company/"+update,{
                headers:myHeaders,
                method:"put",
              
                body: JSON.stringify(formData)
            })
            .then(response=>{
                console.log(response)
                return response.json()
            }).catch(err=>{
              
                console.error("PUT FETCH",err);

            })
            routeChangeAdmin();
          
           

        }
      
    }
    return (
        <div className="registerMain">

            <h1>{update? "Update The Company number: " +update :"Enter Your Company"}</h1>
            <h1>{}</h1>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Company Create With Success !
                </Alert>
            </Snackbar>


            <form className="registerMain_form" onSubmit={handleSubmit}>

                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="name"
                    label="name"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="address"
                    label="address"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="web_site"
                    label="web_site"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />

                <div className="register_buttons">

                    <Button onClick={(stocking !== null && stocking[0].role === 1) ? routeChangeAdmin : routeChange}>Back</Button>
                    <Button onClick={handleSubmit} autoFocus>{update?"UPDATE":"CREATE"}</Button>
                </div>
            </form>
     </div>
    );
}

