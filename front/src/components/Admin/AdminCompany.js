import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

export default function Company() {
    const [data, setData] = useState(null);
    const history = useHistory();


    const routeRegister = () => {
        let path = `registerCompany`;
        history.push(path);
    }

    useEffect(() => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
        fetch(`http://localhost:5000/company`, {
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
        { field: 'id_company', headerName: 'id_company', width: 70 },
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'address', headerName: 'address', width: 130 },
        { field: 'web_site', headerName: 'web_site', width: 160 },
        {
            field: 'delete',
            headerName: 'Delete',

            width: 160,
            renderCell: () => {
                return (
                    <Button onClick={() => window.location.reload(false)} ><DeleteIcon /> </Button>
                   
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
                
                );
            }
        },
    ]

    const handleClick = (e) => {
        if (e.field === "delete") {
            handleDelete(e)
        }else{
         
            localStorage.setItem("update",e.id)
            routeRegister();
            console.log(e);
         
        }
    }

    const handleDelete = (e) => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
        fetch("http://localhost:5000/company/" + e.id, {
            headers: myHeaders,
            method: 'DELETE'
        })
            .then(response => {
                return response.json();
            })
    }
    return (
        <div>
            <div>
                <div>
                    <div style={{ height: 400, width: "70%", margin: "0 auto", marginTop: "5%" }}>
                        <h1>Table Company</h1>
                        {data !== null &&
                        <DataGrid
                            rows={data}
                            getRowId={(row) => row.id_company}
                            onCellClick={handleClick}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                        }
                        <Button onClick={routeRegister} type="submit" startIcon={<AddIcon />}>
                            Add Company
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}