import React from 'react'
import styled from 'styled-components'
import { useFormik } from "formik"
import * as yup from "yup"
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '@mui/material/Button';
import { useContext } from 'react'
import axios from "axios"
import { AuthContext } from '../context/authContext'
import UserDataTable from './UserDataTable'


const Container = styled.div`
    flex: 6;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    overflow-y: scroll;
`

const Wrapper = styled.div`
    width: 95%;
    padding: 50px 0;
    margin-top: 30px;
    background-color: white;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
      box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
`

const CreateUser = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
`

const Title = styled.h2`
    
`

const Form = styled.form`
    width: 97%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const InputDiv = styled.div`
    width: 50%;
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
 
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
  margin-left: 42px;
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

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
    username: yup
        .string()
        .min(3, "Please enter you real name")
        .required("Username is required!"),
    email: yup.string().email("Please enter a valid email address").required(),
    status: yup.string().min(1, "Please select status...").required("Please select status..."),
    password: yup
        .string()
        .matches(PASSWORD_REGEX, "Please enter a strong password")
        .required()
})

function Users() {


    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState([]);

    console.log(edit)

    const navigate = useNavigate()
    const { register } = useContext(AuthContext)

    const onSubmit = async (values) => {
        try {
            await register(values)
            setError(null);
            formik.resetForm();
        } catch (err) {
            if (err && err.response) setError(err.response.data);
            setSuccess(null);
        };
    }

    const formik = useFormik({
        initialValues: {
            username: edit ? edit.name : "",
            email: edit ? edit.email : "",
            status: edit ? edit.status : '',
            password: "",
        },
        enableReinitialize:true,
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })


    console.log(error)
    return (
        <Container>
            <Wrapper>
                <CreateUser>
                    <Title>Create A New User</Title>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputDiv>
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
                        </InputDiv>
                        <InputDiv>
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
                        </InputDiv>
                        <InputDiv>
                            <Label htmlfor="status">Status</Label><br />
                            <Select
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <Option value=""  >
                                    Select Status
                                </Option>
                                <Option value="content writer" selected >
                                    Content Writer
                                </Option>
                                <Option value="owner"  >
                                    Owner
                                </Option>
                            </Select>
                            <FieldError style={{ display: formik.touched.status && formik.errors.status ? "block" : "none" }}>
                                {formik.touched.status && formik.errors.status
                                    ? formik.errors.status
                                    : ""}
                            </FieldError>
                        </InputDiv>
                        <InputDiv>
                            <Label htmlfor="password">Password</Label><br />
                            <Input
                                type="password"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}>
                            </Input><br />
                            <FieldError style={{ display: formik.touched.password && formik.errors.password ? "block" : "none" }}>
                                {formik.touched.password && formik.errors.password
                                    ? formik.errors.password
                                    : ""}
                            </FieldError>
                        </InputDiv>
                        <Button type="submit" variant="contained" sx={ButtonSX}>
                            Create
                        </Button>
                    </Form>
                </CreateUser>
            </Wrapper>
            <Wrapper>
                <UserDataTable setEdit={setEdit} />
            </Wrapper>
        </Container>
    )
}

export default Users