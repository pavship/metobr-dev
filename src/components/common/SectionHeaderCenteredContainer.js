import React from 'react'
import CenteredContainer from './CenteredContainer';

const SectionHeaderCenteredContainer = ({ children }) => {
  return (
    <CenteredContainer
      p='calc(5rem/14) 0'
      fs='calc(18rem/14)'
      fw='bold'
      ws='.8rem'
      lh='normal'
      bb='1px solid rgb(213, 214, 215)'
    >
      {children}
    </CenteredContainer>
  )
}

export default SectionHeaderCenteredContainer
