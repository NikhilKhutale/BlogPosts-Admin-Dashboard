import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import DOMPurify from "dompurify";


const Container = styled.div`
    height: 70vh;
    width: 70vw;
    overflow-y: scroll;
    background-color: white;
`

const Navbar = styled.div`
    height: 100px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ee4266;
`

const Image = styled.div`
    background: linear-gradient(180deg, rgba(175,175,175,0.4125000341933649) 0%, rgba(51,48,48,1) 100%), 
    url(${props => props.Img ? props.Img : null});
    min-height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`

const Info = styled.div`
    position: absolute;
    bottom: 0;
    left: 20%;
    color: white;
`

const Category = styled.span`
    font-size: 18px;
    letter-spacing: 1px;
    cursor: pointer;
    &:hover{
        color: #ee4266;
    }
`

const Title = styled.h1`
    font-size: 60px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
           line-clamp: 1;
    -webkit-box-orient: vertical;

    &:hover{
        color: #ee4266;
    }
`

const AddInfo = styled.ul`
    display: flex;
    margin: 3px 0 70px 0;
`

const PublishDate = styled.li`
    font-size: 13px;
`

const Comments = styled.li`
    margin: 0 25px;
    font-size: 13px;
`

const Views = styled.li`
    font-size: 13px;
`

const Wrapper = styled.div`
    display: flex;
    padding: 0 11%;
`

const Content = styled.div`
    flex: 3;
    text-align: justify;
`

const Share = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: center;
    color: white;
`

const Icon = styled.div`
    font-size: 10px;
    font-weight: 200;
    letter-spacing: 2px;
    padding: 8px 10px;
    margin-right: 8px;
    border-radius: 4px;
    background-color: ${props => props.bg};
`

const PostTitle = styled.h3`
    margin: 30px 0 15px 0;
`

const MainContentDiv = styled.div`
    & > * {
        word-spacing: 1px;
        text-align: justify;
        margin-bottom: 11px;
    }

    & > p {
        font-size: 18px;

        & > img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width:50%;
        }
    }


    & > blockquote{
        font-size: 19px;
        border: 1px solid #e8eaed;
        padding: 15px 15px;
        margin: 20px 0;

        &::before {
            content: "\f10d";
            font-family: fontAwesome;
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            border-radius: 50%;
            color: #ee4266;
            font-size: 30px;
            background: #fff;
            border: 2px solid #e8eaed;
            float: left;
            margin-right: 10px;
        }
    }
`

const Tags = styled.div`
    margin: 20px 0;
`

const Sidebar = styled.div`
    flex: 1;
    margin-top: 25px;
    margin-left: 30px;
    border: 2px solid #ee4166;
    height: 400px;
`



function DemoPost({ props }) {

    console.log(props)
    return (
        <Container>
            <Navbar>Navbar</Navbar>
            <Image Img={props.img}>
                <Info>
                    <Category>{props.cat}</Category>
                    <Title>{props.title}</Title>
                    <AddInfo>
                        <PublishDate>20 APRIL 2022</PublishDate>
                        <Comments><i class="fa-solid fa-comments"></i> 12</Comments>
                        <Views><i class="fa-solid fa-heart"></i> 56</Views>
                    </AddInfo>
                </Info>
            </Image>
            <Wrapper>
                <Content>
                    <Share>
                        <Icon bg='#225b99'>
                            <i class="fa-brands fa-facebook-f"> | SHARE</i>
                        </Icon>
                        <Icon bg='#00adf2'>
                            <i class="fa-brands fa-twitter"> | TWEET</i>
                        </Icon>
                        <Icon bg='#db4a39'>
                            <i class="fa-brands fa-google-plus-g"> | ADD</i>
                        </Icon>
                        <Icon bg='#d62976'>
                            <i class="fa-brands fa-instagram"> | SHARE</i>
                        </Icon>
                    </Share>
                    <PostTitle>{props.title}</PostTitle>
                    <MainContentDiv dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(props.descr,{ADD_TAGS: ['iframe']}),
                    }}></MainContentDiv>
                    <Tags><span>Tags : </span>{props.tags}</Tags>
                </Content>
                <Sidebar>Sidebar</Sidebar>
            </Wrapper>
        </Container>
    )
}

export default DemoPost