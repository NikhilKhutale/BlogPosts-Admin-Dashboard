import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';


const Div = styled.div`
    border-bottom: 1px solid #eee;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ButtonSX = {
  fontSize: '14px',
  marginRight: "20px",
  width: '10%',
  backgroundColor: 'rgba(246,103,133,0.7)',
  margin: '10px',

  '&:hover': {
    backgroundColor: 'rgba(246,103,133,0.7)'
  }
}

const ButtonBX = {
  flex: "1",
  fontSize: '14px',
  marginRight: "20px",
  width: '50%',
  backgroundColor: 'rgba(246,103,133,0.7)',
  margin: '10px',

  '&:hover': {
    backgroundColor: 'rgba(246,103,133,0.7)'
  }
}

const DivInModal = styled.div`
  height: 100vh;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const Upload = styled.div`
  background-color: rgb(251, 251, 255);
  width: 50vw;
  border-radius: 20px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.h3`
  
`

const UploadDiv = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 2px solid #eee;
`

const UrlImg = styled.div`
  padding: 20px;
  border: 2px solid #eee;
`

const CloseDiv = styled.div`
  text-align: end;
`

const Logo = styled.h1`
    padding: 20px;
    font-weight: bold;
    color: #11151c;

    & .link{
        text-decoration: none;
        color: #11151c;
    }

    
`

const IconDiv = styled.div`
display: flex;
align-items: center;
  & .icons {
      margin-right: 20px;
      text-decoration: none;
      color: #11151c;
      cursor: pointer;
    }

    & > a, a:link, a:visited{
      text-decoration: none;
      color: #11151c;
      cursor: pointer;
    }
`

const Span = styled.span`
    color: #ee4266;
`

function Navbar() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [urlImg, setUrlImg] = useState()
  const [progress, setProgress] = useState()
  const [commentClick, setCommentClick] = useState(null)
  const [answerClick, setAnswerClick] = useState(null)

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFile(null)
    setUrlImg()
    setProgress(null)
  };


  const path = useLocation().pathname

  const handleClick = async (e) => {
    e.preventDefault()

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(Math.round(progress))
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {

        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrlImg(downloadURL);
          setProgress("done")
        });
      }
    );
  }

  //console.log(progress)

  return (
    <Div>
      <Logo><Link className='link' to="/">Blog<Span>P</Span>osts</Link></Logo>
      <IconDiv>
      {commentClick ? <Link className="icons" to="/comments"><i class="fa-solid fa-comment"></i></Link> : <Badge className="icons" badgeContent={8} color="primary"><Link style={{color:"#1151c",textDecoration:"none"}} to="/comments" onClick={() => setCommentClick(true)}><i style={{color:"#1151c",textDecoration:"none"}} class="fa-solid fa-comment"></i></Link></Badge>}
      {answerClick ? <Link className="icons" to="/answer"><i class="fa-solid fa-globe"></i></Link> : <Badge className="icons" badgeContent={1} color="primary"><Link style={{color:"#1151c",textDecoration:"none"}} to="/answer" onClick={() => setAnswerClick(true)}><i class="fa-solid fa-globe"></i></Link></Badge>}
      <i class="fa-solid fa-gear icons"></i>

      {path === "/write-post" && <Button variant="contained" sx={ButtonBX} onClick={handleOpen}>Get Url</Button>}
      </IconDiv>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DivInModal>
          <Upload>
            <Title>Upload Img or Videos to get Url..</Title>
            <UploadDiv>
              <input style={{ display: "none" }} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])} />
              <i class="fa-solid fa-square-caret-up"></i>
              <label className='file' htmlFor="file">Upload Image</label>
            </UploadDiv>

            {!progress ?
              <Button style={{ alignSelf: "center" }} variant="contained" sx={ButtonSX} onClick={file && handleClick}>Upload</Button>
              :
              (progress === "done" ?
                <div style={{ alignSelf: "center", backgroundColor: "#3c9a71", borderRadius: "15px", padding: "10px 20px" }}><i class="fa-solid fa-check" style={{ color: "white" }}></i></div>
                :
                <CircularProgress style={{ alignSelf: "center" }} size={20} />
              )
            }

            {urlImg && <UrlImg>{urlImg}</UrlImg>}
            <CloseDiv><Button variant="contained" sx={ButtonSX} onClick={handleClose}>Close</Button></CloseDiv>
          </Upload>
        </DivInModal>
      </Modal>
    </Div>
  )
}

export default Navbar