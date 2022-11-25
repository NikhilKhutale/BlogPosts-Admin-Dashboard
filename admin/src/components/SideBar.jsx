import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CreateIcon from '@mui/icons-material/Create';
import PreviewIcon from '@mui/icons-material/Preview';
import { AuthContext } from '../context/authContext'
import { useContext } from 'react';


const Container = styled.div`
    flex: 1;
    height: 88vh;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const OperationContainer = styled.div`
  
`

const ProfileContainer = styled.div`
  
`

const Div = styled.div`
    width: 100%;
    padding: 10px 0;
    color: #11151c;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover{
      background-color: #eee;
      border-radius: 5px;
    }
`

function SideBar() {

  const navigate = useNavigate()
  //const { logout } = useContext(AuthContext)

  const handleClick = async () => {
    try {
      //await logout()
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Container>
      <OperationContainer>
        <Div>
          <i class="fa-solid fa-pen-to-square" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/write-post">Write Post</Link>
        </Div>
        <Div>
          <i class="fa-solid fa-table-list" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/view-post">View Posts</Link>
        </Div>
        <Div>
          <i class="fa-solid fa-database" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/draft">Drafts</Link>
        </Div>
        <Div>
          <i class="fa-solid fa-comment" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/comments">Comments</Link>
        </Div>
        <Div>
          <i class="fa-regular fa-keyboard" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/answer">Answers</Link>
        </Div>

        <Div>
          <i class="fa-solid fa-users" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/users">Users</Link>
        </Div>

      </OperationContainer>
      <ProfileContainer>
        <Div>
          <i class="fa-solid fa-user" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          <Link style={{ textDecoration: "none", color: '#11151c' }} to="/users">User Profile</Link>
        </Div>
        <Div onClick={handleClick}>
          <i class="fa-solid fa-right-from-bracket" style={{ color: "#ee4266", margin: "0px 15px 0 25px" }}></i>
          Logout
        </Div>
      </ProfileContainer>
    </Container>
  )
}

export default SideBar