import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

export default function JobApplicationAdmin() {

    const history = useHistory();
    const [data, setData] = useState(null);
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const routeCreateJob = () => {
        let path = `registerApplication`;
        history.push(path);
    }

    useEffect(() => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
        fetch(`http://localhost:5000/job_application`, {
            headers: myHeaders,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
            })
    }, [])

    const columns = [
        { field: 'id_job', headerName: 'Job', width: 100 },
        { field: 'id_user', headerName: 'User', width: 100 },
        { field: 'motivation', headerName: 'Motivation', width: 100 },
        { field: 'email', headerName: 'Email', width: 100 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'birthday', headerName: 'Birthday', width: 160 },
        {
            field: 'delete',
            headerName: 'Delete',

            width: 160,
            renderCell: () => {
                return (
                    <Button onClick={() => window.location.reload(false)}><DeleteIcon /></Button>

                );
            }
        },
        {
            field: 'Modify',
            headerName: 'Modify',
            width: 160,
            renderCell: () => {
                return (

                    <Button ><CreateIcon /></Button>


                )
            }
        },
    ]

   const handleClick = (e) => {
        let stock = e.row.id_job
        if (e.field === "delete") {
            handleDelete(stock)
        }else{
            localStorage.setItem("update",e.id)
            routeCreateJob()
            console.log(e);
        }
    }
    const handleDelete = (stock) => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
        fetch("http://localhost:5000/job_application/" + stock, {
            headers: myHeaders,
            method: 'DELETE'
        })
            .then(response => {
                return response.json();
            })
    }

    return (
        <div style={{ height: 400, width: "70%", margin: "0 auto", marginTop: "5%" }}>
            <h1>Job Application</h1>
            {data !== null &&
                <DataGrid
                    rows={data}
                    getRowId={(row) => row.id_job}
                    onCellClick={handleClick}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            }
            <Button onClick={routeCreateJob} type="submit" startIcon={<AddIcon />}>
                Add Application
            </Button>
        </div>

    );
}
