import React from 'react'
import OrgSectionHeader from './OrgSectionHeader';
import CenteredContainer from './common/CenteredContainer';

const EnquiryOrgSection = ({ children }) => {
  return <>
    <OrgSectionHeader />
    <CenteredContainer
      p='1rem 0'
      bb='1px solid rgb(213, 214, 215)'
      fw='bold'
    >
      {children}
    </CenteredContainer>
  </>
}

export default EnquiryOrgSection
