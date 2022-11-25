import React from 'react'
import DraftsTable from './DraftsTable'

function Drafts() {
  return (
    <div style={{flex:"6", overflowY:"scroll"}}>
      <DraftsTable/>
    </div>
  )
}

export default Drafts