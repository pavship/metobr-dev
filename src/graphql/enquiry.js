import gql from 'graphql-tag'

export const signupAndCreateEnquiry = gql`
	mutation SignupAndCreateEnquiry(
		$orgId: ID!
		$regName: String!
		$email: String!
		$tel: String!
		$country: String!
		$modelName: String!
		$qty: Int!
		$period: String!
		$deadlineDateLocal: String
		$htmlText: String
		$files: [FileLinkCreateInput!]!
		$hasAgreedToRules: Boolean!
		$hasAgreedToSearch3rdParty: Boolean
	) {
		signupAndCreateEnquiry(
			orgId: $orgId
			regName: $regName
			email: $email
			tel: $tel
			country: $country
			modelName: $modelName
			qty: $qty
			period: $period
			deadlineDateLocal: $deadlineDateLocal
			htmlText:	$htmlText
			files: $files
			hasAgreedToRules: $hasAgreedToRules
			hasAgreedToSearch3rdParty: $hasAgreedToSearch3rdParty
		) {
			id
			num
		}
	}
`