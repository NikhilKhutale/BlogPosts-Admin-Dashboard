import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';
import axios from "axios"
import styled from 'styled-components';
import { axiosInstance } from '../config';

const Container = styled.div`
    height: 500px;
    padding: 20px;
`

function UserDataTable(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
      axiosInstance.get("api/adminAuth/writers").then(response => {
            setData(response.data)
        })
    }, [])

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "User", width: 230, },
        { field: "email", headerName: "Email", width: 230, },
        { field: "status", headerName: "Status", width: 160, },
    ];

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div >
                  <div style={{cursor:"pointer"}} onClick={() => props.setEdit(params.row)}>View</div>
                <div
                  style={{cursor:"pointer"}}
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];

    

    return (
        <Container>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </Container>
    )
}

export default UserDataTable