import React from 'react'
import ModelSectionHeader from './ModelSectionHeader';
import CenteredContainer from './common/CenteredContainer';

const EnquiryModelSection = ({ children }) => {
  return <>
    <ModelSectionHeader />
    <CenteredContainer
      p='1rem 0'
      bb='1px solid rgb(213, 214, 215)'
    >
      {children}
    </CenteredContainer>
  </>
}

export default EnquiryModelSection
