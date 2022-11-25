import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CommentsTable from './CommentsTable'
import { axiosInstance } from '../config'


const MainDiv = styled.div`
  flex: 6;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

const Container = styled.div`
    overflow-y: scroll;
    height: 60vh;
    width: 70%;
    display: flex;
    flex-direction: column;
`

const ContainerTitle = styled.h2`
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.1;

    
`

const AddComment = styled.div`
    display: flex;

`

const Input = styled.input`
  flex: 2;
  padding: 0 10px;
`

const Button = styled.button`
  flex: 1;
  margin-left: 10px;
  padding: 10px 0;
  cursor: pointer;
`

const CommentList = styled.div`
    margin-bottom: 25px;


    
`

const Comment = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 1px solid #eee;

    &:nth-child(even){
      background-color: #f4eaec;
    }
`

const RealComment = styled.div`
  
`

const User = styled.h5`
  
`

const MainComment = styled.p`
  text-align: justify;
`

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postid, setPostId] = useState();

  console.log(postid)
  const state = useLocation().state
  console.log(state)
  const location = state ? state.id : (postid ? postid : null);

  const postId = location && location;
  console.log(postId)
  //console.log(postId)
  useEffect(() => {
    axiosInstance.get(`api/comments/getComments/${postId}`).then(response => {
      //console.log(response)
      setComments(response.data);
      //props.setCommentCount(response.data.length)
    })
  }, [newComment, postId]);

  //console.log(comments)
  //console.log(id)
  const addComment = async () => {
    try {
      //console.log(newComment)
      await axiosInstance.post("api/comments/addComment", {
        commentBody: newComment,
        ...postId,
        username: "Admin",
      })
      setNewComment("");
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <MainDiv>
      {location ? (
        <Container>
          <ContainerTitle>{comments.length} Comments</ContainerTitle>
          <AddComment>
            <Input
              type="text"
              placeholder="Comment..."
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <Button onClick={addComment}> Add Comment</Button>
          </AddComment>
          <CommentList>
            {comments.slice().reverse().map((comment, index) => {
              return (
                <Comment key={index}>
                  <AlternateEmailIcon />
                  <RealComment>
                    <User>{comment.username}</User>
                    <MainComment>{comment.comment}</MainComment>
                  </RealComment>
                </Comment>
              )
            })}
          </CommentList>
        </Container>
      ) : <div>Select Post From Table....</div>}

      <CommentsTable setPostId={setPostId} />
    </MainDiv>
  )
}

export default Comments