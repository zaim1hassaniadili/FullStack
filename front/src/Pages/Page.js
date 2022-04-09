import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../MyCard.css";
import { useState } from "react";
import { useHistory } from 'react-router';
import "./Page.css"


export default function MyCard(props) {
    let history = useHistory();
    // const [data, setData] = useState(null);
    const [formData, updateFormData] = useState(null);
  

     let toLearnMore = ()=>{
        localStorage.setItem("id_advertisement",props.id_advertisement);
         history.push("/learnmore");
     }

    return (
        <div className="page__card">
            <Card  sx={{ marginTop: "20px"}} className="myCustomPropretie01">
                <CardContent>
                    <Typography variant="h3" color="text.secondary" gutterBottom align="left">{props.title}</Typography>
                    <Typography variant="body2" noWrap>{props.description}</Typography>
                </CardContent>
                <div onClick={toLearnMore}>
                    <Button>Learn More</Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                   
                </div>
         
            </Card>
        </div>
    )
}