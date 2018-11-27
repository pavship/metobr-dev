import React from 'react'
import { Span } from '../shared/styled-semantic.js'
import CenteredContainer from '../shared/CenteredContainer'

const SectionHeaderCenteredContainer = ({ children, num }) => {
  return (
    <CenteredContainer
      p='calc(5rem/14) 0'
      fs='calc(18rem/14)'
      fw='bold'
      ws='.25rem'
      lh='normal'
      bb='1px solid rgb(213, 214, 215)'
    >
      <Span
        pr='.8rem'
      >{num}.</Span>
      {children}
    </CenteredContainer>
  )
}

export default SectionHeaderCenteredContainer
