import React from 'react'
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from "axios"
import PostsTable from './PostsTable';

function ViewPosts() {
  return (
    <div style={{flex:"6", overflowY:"scroll"}}>
      <PostsTable/>
    </div>
  )
}

export default ViewPosts