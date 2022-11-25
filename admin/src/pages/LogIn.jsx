import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from "formik"
import * as yup from "yup"
import { AuthContext } from '../context/authContext'


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, rgba(246,103,133,0.7) 35%, rgba(238,66,102,0.7) 100%),
    #ee4266 url("https://source.unsplash.com/2VyyvZns3qQ") no-repeat;
    border-radius: 5px;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 60vw;
    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
`

const Image = styled.div`
    flex: 1;
    background: linear-gradient(360deg, rgba(240,78,112,0.26404065043986347) 100%, rgba(246,102,132,0.26684177088804273) 100%), 
    url("https://source.unsplash.com/BlGmdY18CFQ") center;
    border-radius: 10px;
    margin-right: 25px;
`

const RegisterDiv = styled.div`
    flex: 1;
    padding: 50px 10px 50px 25px;
`

const Title = styled.h2`
    margin-bottom: 6px;
`
const SubTitle = styled.span`
    
`

const Form = styled.form`
    margin-top: 20px;
    width: fit-content;
`

const Input = styled.input`
    width: ${props => props.type === "checkbox" ? '15px' : '100%'}; 
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Label = styled.label`
    
`


const Extra = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
`

const A = styled.a`
    flex: 1;
    cursor: pointer;
    

    & .link{
        text-decoration: none;
    color: #ee4266;
    }
`

const Remember = styled.div`
    flex: 1;
`

const Span = styled.span`
    display: block;
    margin: 8px 0 0 100px;
    font-size: 13px;
`


const FieldError = styled.div`
    text-align: ${props => props.Type === "Toperror" ? "center" : ""};
    font-size: 12px;
    color: red;
`


const ButtonSX = {
    fontSize: '14px',
    width: '100%',
    backgroundColor: 'rgba(246,103,133,0.7)',
    margin: '10px',

    '&:hover': {
        backgroundColor: 'rgba(246,103,133,0.7)'
    }
}

const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup.string().required("Please enter a password"),
})

function LogIn() {
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const onSubmit = async (values) => {
        try {
            await login(values)

            setError(null);
            formik.resetForm();
            navigate("/")

        } catch (err) {
            if (err && err.response) setError(err.response.data);
        };
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })


    return (
        <Container>
            <Wrapper>
                <Image></Image>
                <RegisterDiv>
                    <Title>Welcome Back!</Title>
                    <SubTitle>Welcome Back! Please Enter Your Details</SubTitle>
                    <Form onSubmit={formik.handleSubmit}>
                        {error ? <FieldError Type="Toperror">{error}</FieldError> : null}
                        <Label htmlfor="email">Email Address</Label><br />
                        <Input
                            type="email"
                            placeholder='xyz@mail.com'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  >
                        </Input><br />
                        <FieldError style={{ display: formik.touched.email && formik.errors.email ? "block" : "none" }}>
                            {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""}
                        </FieldError>
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
                        <Extra>
                            <Remember>
                                <Input type="checkbox" id="Terms" />
                                <Label for="Terms" style={{ fontSize: '15px' }}>  Remember Me</Label>
                            </Remember>
                            <A style={{ paddingLeft: '50px' }}><Link className='link' to="/reset-pass">Forgot Password</Link></A>
                        </Extra>
                        <Button type='submit' variant="contained" sx={ButtonSX} >
                            Sign In
                        </Button>
                        <Button variant="outlined" startIcon={<i class="fa-brands fa-google" style={{ fontSize: '11px' }}></i>} sx={{ width: '100%', fontSize: '14px', margin: '10px', color: 'black', borderColor: '#959595', '&:hover': { borderColor: '#959595' } }}>
                            Sign in with Google
                        </Button>
                        <Span>Don't have an account? <A><Link className='link' to="/register"> Sign Up</Link></A></Span>
                    </Form>
                </RegisterDiv>
            </Wrapper>
        </Container>
    )
}

export default LogIn