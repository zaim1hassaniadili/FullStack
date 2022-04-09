import React from 'react'
import DashBoard from './DashBoard'
import "./Frontage.css"


import { useHistory } from 'react-router';

function Frontage() {
    const history = useHistory();
    const toLogin= () => {
        history.push("/login");
    }
    const toRedirection= ()=>{
        history.push("/redirection")
    }

    return (
        <div>

          
            <div className="frontage__button">
            <button className="frontage__signIn" onClick={toLogin}>SIGN IN</button>
            <button className="frontage__joinUs" onClick= {toRedirection} >JOIN US</button>
            </div>
            <DashBoard/>
        </div>
        
    )
}

export default Frontage;
