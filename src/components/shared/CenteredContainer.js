import React from 'react'
// import styled from 'styled-components'
import { Div } from './styled-semantic.js'

const CenteredContainer = ({p, ...props}) => {
  return (
    <Div
      {...props}
    >
      <Div
        mw='400px'
        m='0 auto'
        p={p}
        pl='.25rem'
        pr='.25rem'
      >
        {props.children}
      </Div>
    </Div>
  )
}

export default CenteredContainer
