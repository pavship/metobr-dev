import React, { Component } from 'react'
import DropezoneWrapper from './DropezoneWrapper'

export default class SmartFilesInput extends Component {
	state = {
		value: this.props.field.curVal || ''
	}
	// handleInputChange = ( e, { value } ) => {
	// 	// TODO validate and parse according to input type
	// 	const { type, field: { name }, setField } = this.props
	// 	let newVal = value
	// 	if (type === 'int' && value !== '') {
	// 		newVal = parseInt(value, 10)
	// 		if (!newVal) return
	// 	}
	// 	this.setState({ value: newVal })
	// 	this.debouncedSetField(name, { value: newVal })
	// }
	render() {
		const {
			field: { diff },
			setField,
			...rest
		} = this.props
		const { value } = this.state
		return (
			<DropezoneWrapper
				{...rest}
				diff={diff}
				ref={this.editorRef}
				diff={diff}
			/>
		)
	}
}

