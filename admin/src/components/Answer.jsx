import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';
import axios from "axios"
import styled from 'styled-components';
import { useFormik } from "formik"
import * as yup from "yup"
import AnswerTable from './AnswerTable';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { axiosInstance } from '../config';


const Container = styled.div`
  flex: 6;
  overflow-y: scroll;
`


const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

const Form = styled.form`
    margin-top: 20px;
    width: 80%;
`

const Input = styled.input`
    width: 93%;
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Textarea = styled.textarea`
    min-width: 93%;
    min-height: 120px;
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;
    transition: all ease-in-out;

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Label = styled.label`
    
`

const FormError = styled.div`
  color: #b32e2e;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
  text-align: center;
`

const FieldError = styled.div`
    text-align: ${props => props.Type === "Toperror" ? "center" : ""};
    font-size: 12px;
    color: red;
`

const Img = styled.img`
  flex: 2;
  margin-left: 70px;
  max-width: 655px;
`

const ButtonSX = {
  fontSize: '14px',
  width: '94%',
  backgroundColor: 'rgba(246,103,133,0.7)',
  marginTop: '10px',

  '&:hover': {
    backgroundColor: 'rgba(246,103,133,0.7)'
  }
}

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Please enter you real name")
    .required("Username is required!"),
  email: yup.string().email("Please enter a valid email address").required(),
  message: yup.string().max(400, "").required("Please enter a message"),
})

function Answer() {

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState([]);
  const [open, setOpen] = useState(false);

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
        sx={{ position: "absolute", transform: "translateY(-70px) translateX(-25px)" }}
      >
        <CloseIcon fontSize="small" sx={{ translateY: "30px" }} />
      </IconButton>
    </React.Fragment>
  );
  const onSubmit = async (values) => {
    try {
      const res = await axiosInstance.put("api/contactUS/update", values)
      setSuccess(res.data)
      setError(null);
      formik.resetForm();

    } catch (err) {
      if (err && err.response) setError(err.response.data);
    };
  }

  console.log(edit)
  const formik = useFormik({
    initialValues: {
      username: edit ? edit.username : "",
      email: edit ? edit.email : "",
      message: edit ? edit.message : "",
      answered: "true",
      id: edit ? edit.id : ""
    },
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  })
  return (
    <Container>
      <MainDiv >
        <Form onSubmit={formik.handleSubmit}>
          <Label htmlfor="username">Username</Label><br />
          <Input
            type="text"
            placeholder='xy_z'
            name='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} >
          </Input><br />
          <FieldError style={{ display: formik.touched.username && formik.errors.username ? "block" : "none" }}>
            {formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""}
          </FieldError>
          <Label htmlfor="email">Email Address</Label><br />
          <Input
            type="email"
            placeholder='xyz@mail.com'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} >
          </Input><br />
          <FieldError style={{ display: formik.touched.email && formik.errors.email ? "block" : "none" }}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </FieldError>
          <Label htmlfor="message">Message</Label><br />
          <Textarea
            type="message"
            name='message'
            rows="4"
            cols="42"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>
          </Textarea><br />
          <FieldError style={{ display: formik.touched.message && formik.errors.message ? "block" : "none" }}>
            {formik.touched.message && formik.errors.message
              ? formik.errors.message
              : ""}
          </FieldError>
          <Button type='submit' variant="contained" sx={ButtonSX} onClick={() => success && handleClick()} >
            Send Mail
          </Button>
        </Form>
        <AnswerTable setEdit={setEdit} />
        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
          message="Sent"
          action={action}
          style={{ bottom: "24px", right: "24px", left: "auto" }}
        />
      </MainDiv>
    </Container>
  )
}

export default Answer