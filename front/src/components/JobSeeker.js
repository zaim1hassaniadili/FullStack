import * as React from 'react';
import {
    Alert,
    Button,
    Snackbar,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./registersStyle.css";




function JobSeeker() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };


    const history = useHistory();

    // let stock = localStorage.getItem("data");
    let update = localStorage.getItem("update")
    // let stocking = JSON.parse(stock);

    const routeChange = () => {
        let path = `/`;
        history.push(path);
    }




    const [formData, updateFormData] = useState(null);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
            role: 2
        });

    }

    function handleSubmit(e) {
        e.preventDefault();

        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });



        fetch("http://localhost:5000/user", {
            headers: myHeaders,
            method: 'post',
            body:JSON.stringify(formData)
        })
            .then(response => {
                return response.json();
        })
        routeChange();

    }
    // function handleSubmitResume(e){
    //     e.preventDefault();
    //     const myHeaders = new Headers({
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //     });



    //     fetch("http://localhost:5000/upload/" + update, {
    //         headers: myHeaders,
    //         method: "put",

    //         body: JSON.stringify(formData)
    //     })
    //         .then(response => {
    //             console.log(response)
    //             return response.json()
    //         }).catch(err => {

    //             console.error("PUT FETCH", err);

    //         })

    // }

    return (
        <div className="registerMain">

            <h1>Enter Your Login Information </h1>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User Create With Success!
                </Alert>
            </Snackbar>


            <form className="registerMain_form" onSubmit={handleSubmit}>

                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
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
         

                <div className="registerMain_buttons">

                    <Button className="registerMain_button" onClick={routeChange}>Back</Button>
                    <Button className="registerMain_button" onClick={handleSubmit} autoFocus> CREATE </Button>
                </div>
            </form>


        </div>
    );
}


export default JobSeeker
