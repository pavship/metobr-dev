import React, { Component } from 'react'

// import { Input } from 'semantic-ui-react'
import { Input } from './styled-semantic.js'

class CurrencyInput extends Component {
	handleInputChange = ( e, { value } ) => {
		// TODO validate and parse according to input type
		// const { type, field: { name }, setField } = this.props
		const { field: { name }, setField } = this.props
		// const newVal = parseInt(value, 10) || ''
		console.log('value > ', value)
		setField(name, { value })
	}
	render() {
		const { field: {curVal: value}, setField, ...rest } = this.props
		return (
			<Input
				{...rest}
				value={value}
				onChange={this.handleInputChange}
			/>
		)
	}
}

export default CurrencyInput
