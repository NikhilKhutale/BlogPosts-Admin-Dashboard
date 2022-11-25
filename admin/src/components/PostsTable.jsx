import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { axiosInstance } from '../config';

const IconContainer = styled.div`
    display: flex;
    gap: 20px;

    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        height:30px;
        width:30px;
        border-radius:50%;
        cursor: pointer;
        }
`

function PostsTable() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);




    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event) => {

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("api/adminPost/")
                setData(res.data)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        setData(data.filter((item) => item.id !== id));
        try {
            const res = await axiosInstance.delete(`api/adminPost/${id}`)
            setSuccess(res.data)
        } catch (err) {
            setError(err)
        }
    };

    const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Title", width: 230, },
        { field: "descr", headerName: "Descr", width: 230, },
        { field: "img", headerName: "Img", width: 160, },
        { field: "date", headerName: "Date", width: 160, },
        { field: "thumbnail", headerName: "Thumbnail", width: 160, },
        { field: "uid", headerName: "Uid", width: 160, },
        { field: "cat", headerName: "Cat", width: 160, },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <IconContainer className="cellAction">
                        <div style={{ backgroundColor: '#3b8cc4' }} >
                            <Link style={{ color: '#fff', textDecoration: "none" }} to="/write-post" state={params.row}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </Link>
                        </div>
                        <div style={{ backgroundColor: '#00a95f' }} >
                            <Link style={{ color: '#fff', textDecoration: "none" }} to="/comments" state={params.row.id}>
                                <i class="fa-solid fa-comment"></i>
                            </Link>
                        </div>
                        <div
                            style={{ backgroundColor: '#d54f3f', color: '#fff' }}
                            onClick={() => { handleDelete(params.row.id); handleClick(); }}
                        >
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </IconContainer>
                );
            },
        },
    ];
    return (
        <div style={{ height: "650px" }}>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
            <Snackbar
                open={open}
                autoHideDuration={500}
                onClose={handleClose}
                message={success}
                action={action}
                style={{ position: "absolute", left: "20px" }}
            />
        </div>
    )
}

export default PostsTable