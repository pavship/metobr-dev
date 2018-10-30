import { compose, graphql } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout } from '../../graphql/layout'

const GlobalContext = ({
		children,
		layout: { page },
		setLayout,
}) => {
	// setLayout({ variables: { 
	// 	page: "Enquiry",
	// } })
  return children({
		page,
		setPage: (page) => setLayout({ variables: { page } }),
	})
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' }),
)(GlobalContext)