import React, { Component } from 'react'
import debounce from 'lodash/debounce';
import WrappedDraftEditor from './shared/WrappedDraftEditor'

class SmartNoteInput extends Component {
	editorRef = React.createRef()
	state = {
		value: this.props.field.curVal || ''
	}
	debouncedSetField = debounce(
		(name, { value }) => {

			this.props.setField(name, { value })
		}
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
		const {
			field: { diff },
			setField,
			...rest
		} = this.props
		const { value } = this.state
		return (
			<WrappedDraftEditor
				{...rest}
				diff={diff}
				ref={this.editorRef}
				diff={diff}
			/>
		)
	}
}

export default SmartNoteInput
