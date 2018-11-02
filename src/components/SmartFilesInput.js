import React, { Component } from 'react'
import DropezoneWrapper from './DropezoneWrapper'

export default class SmartFilesInput extends Component {
	state = {
		files: this.props.field.curVal || []
	}
	handleDrop = (newFiles, rejectedFiles) => {
		console.log('newFiles > ', newFiles)
		const { field: { name }, setField } = this.props
		const { files } = this.state
		const fileNames = files.map(f => f.name)
		// validate name uniqueness
		const [uniq, nonUniq] = newFiles.reduce((res, f) => {
			fileNames.includes(f.name) ? res[1].push(f) : res[0].push(f)
			return res
		}, [[],[]])
		if (nonUniq.length) setField( name, { 
			err: {
				title: 'Не допускается повторение имен фалов',
				items: nonUniq.map(f => f.name),
				isDismissable: true,
				fieldName: 'files'
			}
		})
		this.setState({ files: [ ...this.state.files, ...uniq ] })
		this.upload(uniq)
	}
	upload = (files) => {
		
	}
	render() {
		const {
			field: { diff },
			setField,
			...rest
		} = this.props
		const { files } = this.state
		return (
			<DropezoneWrapper
				{...rest}
				files={files}
				onDrop={this.handleDrop}
			/>
		)
	}
}

