import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';
import axios from "axios"
import styled from 'styled-components';
import { axiosInstance } from '../config';

const Container = styled.div`
    height: 900px;
    width: 70%;
    padding: 20px;
`

function CommentsTable(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("api/comments/getComments/").then(response => {
      setData(response.data)
    })
  }, [])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "comment", headerName: "Comment", width: 230, },
    { field: "postid", headerName: "postId", width: 230, },
    { field: "username", headerName: "Username", width: 160, },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer" }} onClick={() => props.setPostId(params.row.postid)}>View</div>
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

export default CommentsTable