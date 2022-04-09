import React from 'react'
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import "./redirection.css"

function Redirection() {
    let history =useHistory()
    let toJobSeeker= ()=>{
        history.push("/jobseeker");
    }
    let toChampionSeeker= ()=>{
        history.push("/championseeker");
    }  
    return (
        
        <div>
            <div className="redirection__button">
               
                <Button  color="secondary" onClick={toJobSeeker}>Seeking Job</Button>
                <Button color="secondary" onClick={toChampionSeeker}>Seeking a Champion</Button>
            </div>
        </div>
    )
}

export default Redirection
