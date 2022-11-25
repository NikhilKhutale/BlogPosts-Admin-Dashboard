import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import styled from 'styled-components';
import Answer from './components/Answer';
import Comments from './components/Comments';
import Drafts from './components/Drafts';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import ViewPosts from './components/ViewPosts';
import Write from './components/Write';
import Users from './components/Users';
import DemoPost from './pages/DemoPost';
import Welcome from './components/Welcome';
import ErrorPage from './pages/ErrorPage';

const Div = styled.div`
  padding: 0;
  margin: 0;
  height: 88vh;
  display: flex;
`

const Layout = () => {

  return (
    <>
      <Navbar />
      <Div>
        <SideBar />
        <Outlet />
      </Div>
    </>

  )
}


function App() {


  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Welcome />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/write-post",
          element: <Write />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/view-post",
          element: <ViewPosts />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/draft",
          element: <Drafts />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/comments",
          element: <Comments />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/answer",
          element: <Answer />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/users",
          element: <Users />,
          errorElement: <ErrorPage />,
        },
        ,
        {
          path: "/demo-post",
          element: <DemoPost />,
          errorElement: <ErrorPage />,
        }
      ]
    }


  ])


  return (
    <div style={{ backgroundColor: "rgb(251, 251, 255)" }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App