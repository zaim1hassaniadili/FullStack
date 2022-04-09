import * as React from 'react';
import MyCard from "../Pages/Page";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@material-ui/core';
import "./DashBoard.css"



export default function DashBoard(props) {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(true);
    const [formData, updateFormData] = useState(null);


    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    }

    let handlerSubmit = (e) => {
        console.log("Handle Submit")
        if (formData) {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
                Accept: "application/json"
            });
            fetch("http://localhost:5000/search/" + formData.domaine + "/" + formData.contract, {
                headers: myHeaders,

            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data)
                    console.log(data);
                })
        }

    }
    useEffect(() => {
        setData({});
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });


        fetch("http://localhost:5000/advertisement", {
            headers: myHeaders,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
                console.log(data);
            })
            .finally(() => {
                setLoad(false);
            });

    }, [])
    console.log(props);
    return (
        <div className="App">

            <form className="dashBoard__form"onSubmit={handlerSubmit}>
                <div className="dashBoard__phrase">
                <p className="dashBoard__titre">I searching for a job in </p>
                <select className="dashBoard__select" onChange={handleChange} name="domaine">
                    <option value="hotel">hotel</option>
                    <option value="building" >building</option>
                    <option selected value="software" >Software</option>
                    <option value="marketing">Marketing</option>
                    <option value="administation">Administation</option>
                </select>
                <p className="dashBoard_titre">for a</p>
                <select className="dashBoard__select" onChange={handleChange} name="contract">
                    <option value="traineeship">traineeship</option>
                    <option value="internship">internship</option>
                    <option selected value="permanent contract">permanent contract</option>
                    <option value="fixed-term" >fixed-term</option>

                </select>
                <Button onClick={handlerSubmit}><SearchIcon /></Button>
                </div>

            </form>
            {!load && data.map((value, index) => (

                <MyCard key={index} id_advertisement={value.id_advertisement} title={value.title} description={value.description} />
            ))}
        </div>
    );
}