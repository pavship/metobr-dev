import { getLayout } from '../graphql/layout'

const resolvers = {
	Mutation: {
		setLayout: (_, input, { cache }) => {
			const query = getLayout
			const data = cache.readQuery({ query })
			data.layout = {
				...data.layout,
				...input
			}
			cache.writeQuery({ query, data })
			return null
		},
	}
}

export default resolvers