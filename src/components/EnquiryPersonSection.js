import React from 'react'
import PersonSectionHeader from './PersonSectionHeader';
import CenteredContainer from './shared/CenteredContainer';

const EnquiryPersonSection = ({ children }) => {
  return <>
    <PersonSectionHeader />
    <CenteredContainer
      p='1rem 0'
      bb='1px solid rgb(213, 214, 215)'
      // fs='calc(18rem/14)'
    >
      {children}
    </CenteredContainer>
  </>
}

export default EnquiryPersonSection
