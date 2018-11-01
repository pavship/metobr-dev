import React, { Component } from 'react'
import debounce from 'lodash/debounce';
import { Input } from './styled-semantic.js'

class CurrencyInput extends Component {
	state = {
		value: this.props.curVal || ''
	}
	debouncedSetField = debounce(
		(name, { value }) => this.props.setField(name, { value })
	, 250)
	handleInputChange = ( e, { value } ) => {
		// TODO validate and parse according to input type
		const { type, field: { name }, setField } = this.props
		let newVal = value
		if (type === 'int' && value !== '') {
			newVal = parseInt(value, 10)
			if (!newVal) return
		}
		this.setState({ value: newVal })
		this.debouncedSetField(name, { value: newVal })
	}
	render() {
		const { field: { curVal }, setField, type, ...rest } = this.props
		const { value } = this.state
		return (
			<Input
				{...rest}
				type={type === 'int' ? 'number' : type}
				value={value}
				onChange={this.handleInputChange}
			/>
		)
	}
}

export default CurrencyInput
