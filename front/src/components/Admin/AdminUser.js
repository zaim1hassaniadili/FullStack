import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from "react-router-dom";

export default function AdminUser() {

    const [data, setData] = useState(null);
    const history = useHistory();
    


    const routeRegister = () => {
        let path = `register`;
        history.push(path);
    }

    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    useEffect(() => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        });
        fetch(`http://localhost:5000/user`, {
            headers: myHeaders,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
            })
    },[])

    const columns = [
        {field: 'id_user', headerName: 'ID', width: 70},
        {field: 'firstName', headerName: 'First name', width: 130},
        {field: 'lastName', headerName: 'Last name', width: 130},
        {field: 'birthday', headerName: 'Birthday', width: 160},
        {field: 'role', headerName: 'Role', width: 160},
        {
            field: 'delete',
            headerName: 'Delete',

            width: 160,
            renderCell: () => {
                return (
                    <Button onClick={() => window.location.reload(false)} ><DeleteIcon/> </Button>
                  
                );
            }
        },
        {
            field: 'Modify',
            headerName: 'Modify',
            width: 160,
            renderCell: () => {
                return (
                
                        <Button><CreateIcon/></Button>
                    
                )
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
        fetch("http://localhost:5000/user/" + e.id, {
            headers: myHeaders,
            method: 'DELETE'
        })
            .then(response => {
                return response.json();
            })
    }


    // const handleCellClick =(params,e) =>{
    //     console.log("handleCellClick event:",e);
    //     console.log("handleCellClick params:",params);
    // }
    return (
        <div style={{height: 400, width: "70%", margin: "0 auto", marginTop: "5%"}}>
            <h1>Table User</h1>
            {data !== null &&
            <DataGrid
                rows={data}
                getRowId={(row) => row.id_user}
                onCellClick={handleClick}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            }
            <Button onClick={routeRegister} type="submit" startIcon={<AddIcon/>}>
                Add User
            </Button>
        </div>
    );
}