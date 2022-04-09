import * as React from 'react';
import { CardActions, Paper} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



export default function Login() {

    const history = useHistory();

    const routeAdmin = () => {
        let path = `admin`;
        history.push(path);
    }
    const routeUser = () => {
        let path = `user`;
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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(formData)
        fetch("http://localhost:5000/register", {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(formData)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                localStorage.setItem("data",JSON.stringify(data));
                console.log('Here in the fetch',data)
                if (data[0]?.role === 1) {
                    routeAdmin()
                } else if (data[0]?.role === 2 ||data[0]?.role===3 ) {
                    routeUser()
                }else{
                    history.push("error")
                }
                })
    }
    return (
        <div style={{width: "40%", margin: "20% auto"}}>
            <form onSubmit={handleSubmit}>
                <Paper elevation={23}>
                    <Typography textAlign="center"gutterBottom variant="h5" component="div">
                        Login
                    </Typography>
                    <CardContent>
                        <TextField
                            style={{marginBottom: "5%"}}
                            fullWidth
                            type="text"
                            label="email"
                            name="email"
                            size="small"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="password"
                            name="password"
                            size="small"
                            type="password"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </CardContent>
                    <CardActions>
     
                        <Button fullWidth color="secondary" type="submit" variant="contained">
                            Log in
                        </Button>
                       
                    </CardActions>
                </Paper>
            </form>
        </div>
    )
        ;
}
//mysql://b7ed1fb9169e51:5023021d@eu-cdbr-west-01.cleardb.com/heroku_bc67bab3c0c20da?reconnect=true