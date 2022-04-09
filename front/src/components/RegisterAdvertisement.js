import * as React from 'react';
import {
    Alert,
    Button,
    Snackbar,
    TextareaAutosize,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";


export default function RegisterAdvertisement() {

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

        if (!update) {
            setOpen(true);
            fetch("http://localhost:5000/advertisement/", {
                headers: myHeaders,
                method: 'post',
                body: JSON.stringify(formData)
            })
                .then(response => {
                    return response.json();
                })
        } else {


            fetch("http://localhost:5000/advertisement/" + update, {
                headers: myHeaders,
                method: "put",

                body: JSON.stringify(formData)
            })
                .then(response => {
                    console.log(response)
                    return response.json()
                }).catch(err => {

                    console.error("PUT FETCH", err);

                })
            routeChangeAdmin();



        }

    }

    return (
        <div className="registerMain">

            <h1>{update ? "Update Advertisement number: " + update : "Create an Advertisement"}</h1>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Advertisement Create With Success !
                </Alert>
            </Snackbar>


            <form className="registerMain_form" onSubmit={handleSubmit}>

                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="title"
                    label="title"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="register"
                    type="date"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextareaAutosize
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="description"
                    label="description"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="Company"
                    label="Company"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    className="registerMain_textField"
                    id="outlined-basic"
                    autoFocus
                    margin="dense"
                    name="city"
                    label="city"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <select onChange={handleChange} name="domaine">
                    <option value="hotel">hotel</option>
                    <option value="building" >building</option>
                    <option selected value="software" >Software</option>
                    <option value="marketing">Marketing</option>
                    <option value="administation">Administation</option>
                </select>

                <select onChange={handleChange} name="contract">
                    <option value="traineeship">traineeship</option>
                    <option value="internship">internship</option>
                    <option selected value="permanent contract">permanent contract</option>
                    <option value="fixed-term" >fixed-term</option>

                </select>


                <div className="registerMain_buttons">

                    <Button onClick={(stocking !== null && stocking[0].role === 1) ? routeChangeAdmin : routeChange}>Back</Button>
                    <Button onClick={handleSubmit} autoFocus> {update ? "UPDATE" : "CREATE"}</Button>

                </div>
            </form>

        </div>
    );
}




