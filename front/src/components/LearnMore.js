import { Button } from '@material-ui/core';
import { Dialog, DialogContentText, DialogContent, DialogActions, DialogTitle, TextField, TextareaAutosize } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import "./LearnMore.css";



function LearnMore() {
    let Information;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    function handleSubmit(e) {
        e.preventDefault()
        console.log("form= ", formData);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:5000/job_application", {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(formData)
        })
            .then(response => {
                return response.json();
            })
    }

    const [data, setData] = useState(null);
    const [formData, updateFormData] = useState(null);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    }
    useEffect(() => {
        myFetchFun();

    }, [performance.navigation.TYPE_RELOAD])

    let id = localStorage.getItem("id_advertisement");
   

    function myFetchFun() {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
             
             Accept: "application/json"
        });
        fetch(`http://localhost:5000/advertisement/` + id, {
            headers: myHeaders,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
                //localStorage.removeItem("id_adverisement");
                console.log("second fetch ", data);
            })
            
        
    }

    let data_page = JSON.parse(localStorage.getItem("data"));
    let myLogic = data_page !== null;
    return (
        <div>
            <div className="learnMore__container">    


                  {data && 
                  <div>
                  <h1>{data[0].title}</h1>
                  <p>{data[0].city}</p>
                  <p>{data[0].contract}</p>
                  <p>{data[0].realease_date}</p>
                  <p>{data[0].description}</p>
                  </div>
                  }
              




                <button className="learnMore__button"onClick={handleOpen}>Apply</button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Enter Information About You"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {!myLogic && <TextField
                                autoFocus
                                margin="dense"
                                name="email"
                                label="Adresse email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />}
                            {!myLogic && <TextField
                                autoFocus
                                margin="dense"
                                name="firstName"
                                label={(myLogic) ? data_page[0].firstName : "First name"}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />}
                            {!myLogic && <TextField
                                autoFocus
                                margin="dense"
                                name="lastName"
                                label={(myLogic) ? data_page[0].lastName : "Last name"}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />}
                            {!myLogic && <TextField
                                autoFocus
                                margin="dense"
                                name="birthday"
                                label={(myLogic) ? data_page[0].birthday : "AAAA-MM-JJ"}
                                type="date-time"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />}
                            <TextareaAutosize
                                fullWidth
                                maxRows={4}
                                name="motivation"
                                aria-label="maximum height"
                                placeholder="Motivation Area"
                                style={{ width: 550 }}
                                onChange={handleChange}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleSubmit} autoFocus>  Agree </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default LearnMore
