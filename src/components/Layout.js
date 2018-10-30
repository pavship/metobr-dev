import React from 'react'

import { Query } from 'react-apollo'
import { me } from '../graphql/user'

import GlobalContext from './data/GlobalContext'
import SimpleNavBar from './shared/SimpleNavBar';
import LoginPage from './shared/LoginPage'
import EnquiryPage from './EnquiryPage';

const makeMenuName = (person) => {
  const { fName, lName } = person
  return fName + ' ' + (lName ? `${lName.slice(0,1)}.` : '')
}

const Layout = ({ token, refreshToken }) => {
  return (
    <GlobalContext>
      {({ page, setPage }) =>
        <>
          {!token
            ?	<SimpleNavBar
                title='ООО "Компания Энергоремонт"'
                login={() => setPage('Login')}
              />
            : <Query query={me} >
                {({ loading, error, data }) => {
                  // if (loading) return null
                  // if (error) return `Error!: ${error.message}`
                  return (
                    <>
                      <SimpleNavBar
                        title='ООО "Компания Энергоремонт"'
                        username={data && data.me ? makeMenuName(data.me.person) : 'tt'}
                        logout={() => refreshToken(null)}
                      />
                    </>
                  )
                }}
            </Query> 
          }
          {page === 'Login'
            ?	<LoginPage
                refreshToken={(token) => {
                  setPage('Enquiry')
                  refreshToken(token)
                }}
              />
            : <EnquiryPage />
          }
        </>
      }
    </GlobalContext>
  )
}

export default Layout