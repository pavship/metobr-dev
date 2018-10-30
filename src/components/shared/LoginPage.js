import React, { Component } from 'react'

import styled from 'styled-components'
import { Form, Message, Button, Segment } from 'semantic-ui-react'

import { graphql, compose } from 'react-apollo'
import { login } from '../../graphql/user'

const SSegment = styled(Segment)`
	max-width: 350px !important;
	margin: auto !important;
`

class LoginPage extends Component {
	state = {
		email: '',
		password: '',
		sendingRequest: false,
		error: ''
	}
	handleInputChange = (attr) => {
		this.setState({ [attr]: this[attr].value })
	}
	submit = async () => {
		try {
			const { email, password } = this.state
			this.setState({ sendingRequest: true })
			const result = await this.props.login({
				variables: {
					email,
					password
				}
			})
			const token = result.data.login.token
			this.setState({ sendingRequest: false })
			this.props.refreshToken(token)
		} catch (err) {
			this.setState({ error: err.message, sendingRequest: false })
		}
	}
	render() {
		const { email, password, sendingRequest, error } = this.state
		return (
			<SSegment basic>
				<Form error={!!error}>
					<Form.Field>
						<label>E-mail</label>
						<input 
							type="email" 
							placeholder='E-mail'
							ref={ref => this.email = ref} 
							onChange={() => this.handleInputChange('email')} />
					</Form.Field>
					<Form.Field>
						<label>Пароль</label>
						<input 
							type="password" 
							placeholder='Пароль'
							ref={ref => this.password = ref} 
							onChange={() => this.handleInputChange('password')} />
					</Form.Field>
					<Message
						error
						header='Войти не удалось..'
						content={error} />
					<Button 
						primary
						type='submit'
						floated='right'
						disabled={!email || !password || sendingRequest}
						loading={sendingRequest}
						onClick={this.submit} >
						Войти
					</Button>
				</Form>
			</SSegment>
		)
	}
}

export default compose(
	graphql(login, {
		name: 'login',
		options: {
			fetchPolicy: 'no-cache'
		}
	})
)(LoginPage)
