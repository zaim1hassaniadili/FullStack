import React from 'react'
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./UpdateUserPage.css"


function UpdateUserPage() {
    let history = useHistory();

    function handleSubmit() {

    }
    function handleChange() {

    }
    const routeChange = () => {
        let path = `/user`;
        history.push(path);
    }

    // let stocking = JSON.parse(localStorage.getItem("data"));

    return (
        <div>
            <div className="wrapper">
                <h1>Update Your Profil</h1>
                <form onSubmit={handleSubmit}>

                    <div className="wrapper">
                        <TextField
                            id="outlined-basic"
                            autoFocus
                            margin="dense"
                            name="firstName"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-basic"
                            autoFocus
                            margin="dense"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-basic"
                            autoFocus
                            margin="dense"
                            name="email"
                            label="Email"
                            type="text"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-basic"
                            autoFocus
                            margin="dense"
                            name="birthday"
                            type="date"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-basic"
                            autoFocus
                            margin="dense"
                            name="role"
                            label="jobseeker(1) or recruter(2)"
                            type="text"
                            min={2}
                            max={3}
                            variant="outlined"
                            onChange={handleChange}
                        />

                    </div>

                    <Button
                        onClick={routeChange}>BACK</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        SAVE
                    </Button>


                </form>
            </div>
        </div>
    )
}

export default UpdateUserPage
