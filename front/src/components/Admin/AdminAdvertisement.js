import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

export default function AdvertisementTable() {

    const [data, setData] = useState(null);
     const history = useHistory();

    const routeRegister = () => {
        let path = `registerAdvertisement`;
        history.push(path);
    }
    // const goToUpdate = () => {
    //     console.log("Hello");
    //     let path = `/register`;
    //     history.push(path);
    // }


    useEffect(() => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
        fetch(`http://localhost:5000/advertisement`, {
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
        { field: 'id_advertisement', headerName: 'id_advertisement', width: 70 },
        { field: 'title', headerName: 'title', width: 130 },
        { field: 'description', headerName: 'description', width: 130 },
        { field: 'user_id', headerName: 'user_id', width: 160 },
        { field: 'company_id', headerName: 'company_id', width: 160 },
        { field: 'release_date', headerName: 'release_date', width: 160 },
        {
            field: 'delete',
            headerName: 'Delete',

            width: 160,
            renderCell: () => {
                return (
                    <Button onClick={() => window.location.reload(false)}><DeleteIcon/></Button>
                   
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
            console.log('ID advertisemnet',e);
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
        fetch("http://localhost:5000/advertisement/" + e.id, {
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
                <div style={{ height: 400, width: "70%", margin: "0 auto", marginTop: "5%" }}>
                    <h1>Table AdvertisementTable</h1>
                    {data !== null &&
                    <DataGrid
                        rows={data}
                        getRowId={(row) => row.id_advertisement}
                        onCellClick={handleClick}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    }
                    <Button onClick={routeRegister} type="submit" startIcon={<AddIcon />}>
                        Add Advertisement
                    </Button>
                </div>
            </div>
        </div>
    )
}