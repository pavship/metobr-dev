import React, { Component } from 'react'

import styled from 'styled-components'
import { Input, Segment } from 'semantic-ui-react'

import Dropzone from 'react-dropzone'

const FileItem = styled(Input)`
	width: 270px !important;
	input {
		cursor: default;
		border-radius: 0 !important;
		border-bottom: none !important;
	}
	&:first-child {
		input {
			border-radius: calc(4rem/14) calc(4rem/14) 0 0 !important;
		}
	}

`

const SDropzone = styled(Dropzone)`
	display: inline-block !important;
	input {
		width: 231.5px !important;
		cursor: pointer;
		text-align: center !important;
		border-style: dashed !important;
		outline: none !important;
		color: transparent !important;
	}
	&.activeDropzone>div {
		&>input {
			border: 1px solid #21ba45 !important;
		}
		&>button {
			border: 1px solid #21ba45 !important;
			border-left: none !important;
			background-color: #21ba45 !important;
			color: white !important;
		}
	}
`

const DropzoneWrapper = styled.div`
	display: inline-block;
	:not(:first-child) {
		input {
			border-top-left-radius: 0 !important;
			border-top-style: solid !important;
		}
		button {
			border-top-right-radius: 0 !important;
		}
	}
	:hover {
		input {
			border: 1px solid rgb(202, 203, 205) !important;
		}
		button {
			color: rgba(0,0,0,.8) !important;
			background-color: rgb(202, 203, 205) !important;
		}
	}
`

export default class DropezoneWrapper extends Component {
	state = {
		textInput: ''
	}
	render() {
		const {
			files,
			onDrop
		} = this.props
		const { textInput } = this.state
		return (
			<div
				style={{
					display: 'inline-block',
					width: '270px'
				}}
			>
				{files.map(({ name }) =>
					<FileItem
						key={name}
						value={name}
						onFocus={e => e.target.blur()}
					/>
				)}
				<DropzoneWrapper>
					<SDropzone
						activeClassName='activeDropzone'
						onDrop={onDrop}
					>
							<Input
								action={{ icon: 'download' }} 
								placeholder='Перетащите сюда файлы'
								value=''
								onFocus={e => e.target.blur()}
							/>
					</SDropzone>
				</DropzoneWrapper>
			</div>
		)
	}
}
