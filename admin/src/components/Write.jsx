import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import 'react-quill/dist/quill.snow.css';
import { useContext } from 'react';
import styled from 'styled-components'
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"
import { AuthContext } from '../context/authContext'
import Button from '@mui/material/Button';
import moment from "moment"
import DemoPost from '../pages/DemoPost';
import Modal from '@mui/material/Modal';
import { axiosInstance } from '../config';


const Form = styled.form`
    width: 97%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const InputDiv = styled.div`
    width: 50%;
    margin-bottom: 20px;
`

const Label = styled.label`
    margin-left: 42px;
`

const Input = styled.input`
    width: 80%;
    padding: 10px 8px; 
    margin: 8px 42px; 
    border: 1px solid #ccc; 
    border-radius: 5px;

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Select = styled.select`
    width: 83%;
    padding: 10px 8px; 
    margin: 8px 42px; 
    border: 1px solid #ccc; 
    border-radius: 5px;

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Option = styled.option`
     
`

const DemoDiv = styled.div`
  background-color: #F16784;
  width: 200px;
  color: white;
  font-size: 17px;
  font-weight: 600;
  padding: 10px 15px;
  text-align: center;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 8px;

  &:hover{
    background-color: white;
    border: 1px solid #4d4d4d;
    color: #4d4d4d;
  }
`

const ModalDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`

const DraftDiv = styled.div`
  border: 1px solid #4d4d4d;
  width: 200px;
  color: #4d4d4d;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  padding: 10px 15px;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 8px;

  &:hover{
    background-color: #F16784;
    border: 1px solid white;
    color: white;
  }
`

const FormError = styled.div`
  color: #b32e2e;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
  text-align: center;
`;

const FormSuccess = styled.span`
  color: #28a828;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
`;

const FieldError = styled.div`
  margin-left: 42px;
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
`




const ButtonSX = {
  fontSize: '14px',
  width: '80%',
  backgroundColor: 'rgba(246,103,133,0.7)',
  margin: '10px',

  '&:hover': {
    backgroundColor: 'rgba(246,103,133,0.7)'
  }
}

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Please enter you title")
    .required("Title is required!"),
  tags: yup.string().required("Please enter a tags"),

  img: yup
    .string()
    .required("provide img"),
  cat: yup.string().min(1, "Please select cat...").required("Please select cat..."),
  thumbnail: yup
    .string()
    .required("provide img"),
})

function Write() {
  const state = useLocation().state

  const [value, setValue] = useState(state ? state.descr : '');
  const [Draftloading, setDraftLoading] = useState(null);
  const [Postloading, setPostLoading] = useState(null);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false) }





  const handleClick = async (values) => {
    console.log("in")
    try {
      setDraftLoading(true)
      await axiosInstance.post("api/adminDraft/", { descr: value, ...values, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") })
      setDraftLoading(null)
      setError(null)
    } catch (err) {
      setError(err)
    }
  }

  const onSubmit = async (values) => {
    console.log({ descr: value, ...values })
    setPostLoading(true)
    try {
      state ? await axiosInstance.put(`api/adminPost/${state.id}`, { descr: value, ...values })
        :
        await axiosInstance.post(`api/adminPost/`, { descr: value, ...values, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }
        );
        setError(null)
    } catch (err) {
      setError(err)
    }
    setPostLoading(null)
  }

  const formik = useFormik({
    initialValues: {
      title: state ? state.title : "",
      tags: state ? state.tags : "",
      img: state ? state.img : '',
      cat: state ? state.cat : "",
      thumbnail: state ? state.thumbnail : ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  })

  return (
    <div style={{ flex: "6", overflowY: 'scroll' }}>
      <EditorToolbar toolbarId={'t1'} />
      <ReactQuill
        style={{ height: "82.5vh" }}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={"Write Something Here..."}
        modules={modules("t1")}
        formats={formats}
      />
      <div style={{ marginTop: "30px" }}>
        <Form onSubmit={formik.handleSubmit}>
          <InputDiv>
            <Label htmlfor="title">Title</Label><br />
            <Input
              type="text"
              placeholder='xy_z'
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} >
            </Input><br />
            <FieldError style={{ display: formik.touched.title && formik.errors.title ? "block" : "none" }}>
              {formik.touched.title && formik.errors.title
                ? formik.errors.title
                : ""}
            </FieldError>
          </InputDiv>
          <InputDiv>
            <Label htmlfor="tags">Tags</Label><br />
            <Input
              type="tags"
              placeholder='xyz@mail.com'
              name='tags'
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} >
            </Input><br />
            <FieldError style={{ display: formik.touched.tags && formik.errors.tags ? "block" : "none" }}>
              {formik.touched.tags && formik.errors.tags
                ? formik.errors.tags
                : ""}
            </FieldError>
          </InputDiv>
          <InputDiv>
            <Label htmlfor="img">Image for background</Label><br />
            <Input
              type="img"
              name='img'
              value={formik.values.img}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
            </Input><br />
            <FieldError style={{ display: formik.touched.img && formik.errors.img ? "block" : "none" }}>
              {formik.touched.img && formik.errors.img
                ? formik.errors.img
                : ""}
            </FieldError>
          </InputDiv>
          <InputDiv>
            <Label htmlfor="thumbnail">Thumbnail for background</Label><br />
            <Input
              type="thumbnail"
              name='thumbnail'
              value={formik.values.thumbnail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
            </Input><br />
            <FieldError style={{ display: formik.touched.thumbnail && formik.errors.thumbnail ? "block" : "none" }}>
              {formik.touched.thumbnail && formik.errors.thumbnail
                ? formik.errors.thumbnail
                : ""}
            </FieldError>
          </InputDiv>
          <InputDiv>
            <Label htmlfor="cat">Category</Label><br />
            <Select
              name="cat"
              value={formik.values.cat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <Option value=""  >
                Select cat
              </Option>
              <Option value="lifestyle"  >
                Lifestyle
              </Option>
              <Option value="fashion"  >
                Fashion
              </Option>
              <Option value="technology"  >
                Technology
              </Option>
              <Option value="travel"  >
                Travel
              </Option>
              <Option value="health"  >
                Health
              </Option>
            </Select>
            <FieldError style={{ display: formik.touched.cat && formik.errors.cat ? "block" : "none" }}>
              {formik.touched.cat && formik.errors.cat
                ? formik.errors.cat
                : ""}
            </FieldError>
          </InputDiv>
          <InputDiv style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <DemoDiv onClick={handleOpen}>See Demo</DemoDiv>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalDiv>
                <DemoPost props={{ descr: value, ...formik.values }} />
              </ModalDiv>
            </Modal>
            <DraftDiv onClick={() => handleClick(formik.values)}>{Draftloading ? "Loading..." : "Save As Draft"}</DraftDiv>
          </InputDiv>
          <Button type="submit" variant="contained" sx={ButtonSX}>
            {Postloading ? "Loading..." : "Publish"}
          </Button>
        </Form>
        {error && <div style={{color:"red"}}>Error Occured, Please Try Again...</div> }

      </div>
    </div>
  )
}

export default Write


