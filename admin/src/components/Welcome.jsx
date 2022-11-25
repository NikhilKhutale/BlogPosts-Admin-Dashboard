import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    flex: 6;
    display: flex;
    align-items: center;
    justify-content: center;
`


function Welcome() {

  return (
    <Div >
        <h1>Hi Welcome...</h1>
    </Div>
  )
}

export default Welcome