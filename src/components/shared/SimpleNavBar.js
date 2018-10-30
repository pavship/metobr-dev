import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import CenteredContainer from '../common/CenteredContainer'

const Menu = styled.div`
	display: flex;
	align-items: center;
`

const MenuTitle = styled.div`
	padding: calc(5rem/14) 0;
	font-size: calc(18rem/14);
	font-weight: bold;
  line-height: normal;
`

const MenuCenterGap = styled.div`
	flex-grow: 10;
`

const UserNameDiv = styled.div`
  padding-right: 0.8rem;
	font-size: calc(15rem/14);
	font-weight: bold;
`

const SimpleNavBar = ({
  title,
  username,
  login,
  logout
}) => {
  return (
    <CenteredContainer
      bb='1px solid #7e7e81'
    >
        <Menu>
          <MenuTitle>
            <i>{title}</i>
          </MenuTitle>
          <MenuCenterGap />
          <UserNameDiv>
            {username}
          </UserNameDiv>
          {login &&
            <Icon
              link
              name='sign-in'
              size='large'
              onClick={login}
            />
          }
          {logout &&
            <Icon
              link
              name='sign-out'
              size='large'
              onClick={logout}
            />
          }
        </Menu>
    </CenteredContainer>
  )
}

export default SimpleNavBar
