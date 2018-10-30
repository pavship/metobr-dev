import gql from 'graphql-tag'

export const getLayout = gql`
	query getLayout {
		layout @client {
			page
		}
	}
`

export const getLayoutOptions = ({
	props: ({ data: { layout } }) => {
		return {
			layout: layout || {}
		}
	}
})

export const setLayout = gql`
	mutation SetLayout($page: json) {
		setLayout(page: $page) @client {
			result
		}
	}
`
