import React from 'react'
import OrgSectionHeader from './OrgSectionHeader';
import CenteredContainer from './shared/CenteredContainer';

const EnquiryOrgSection = ({ children }) => {
  return <>
    <OrgSectionHeader />
    <CenteredContainer
      p='1rem 0'
      bb='1px solid rgb(213, 214, 215)'
      fs='calc(18rem/14)'
    >
      {children}
    </CenteredContainer>
  </>
}

export default EnquiryOrgSection
