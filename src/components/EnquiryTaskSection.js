import React from 'react'
import TaskSectionHeader from './TaskSectionHeader';
import CenteredContainer from './shared/CenteredContainer';

export default ({ children }) => {
  return <>
    <TaskSectionHeader />
    <CenteredContainer
      p='1rem 0'
      bb='1px solid rgb(213, 214, 215)'
    >
      {children}
    </CenteredContainer>
  </>
}
