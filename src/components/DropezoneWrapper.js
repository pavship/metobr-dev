import React, { Component } from 'react'

import styled from 'styled-components'
import { Button, Input } from 'semantic-ui-react'

import Dropzone from 'react-dropzone'

const SDropzone = styled(Dropzone)`
	display: inline-block !important;
	input {
		width: 231.5px !important;
		cursor: pointer;
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
		}
	}
`

const InputWrapper = styled.div`
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

const DropzoneWrapper = styled.div`
	display: inline-block;
	width: 270px;
	min-height: 38px;
	cursor: pointer;
	padding: calc(8.5rem/14) 1em;
	line-height: calc(19rem/14);
	border: 1px solid rgba(34,36,38,.15);
	border-radius: calc(4rem/14);
	transition: all .1s ease;
	:hover {
		background: rgba(0,0,0,.05);
		color: rgba(0,0,0,.65);
	}
`

export default class DropezoneWrapper extends Component {
	state = {
		textInput: ''
	}
	render() {
		const { textInput } = this.state
		const {
			borderless,
			diff,
			forwardedRef,
			...rest
		} = this.props
		return (
			<SDropzone
				activeClassName='activeDropzone'
				onDrop={(acceptedFiles) => {
					console.log('dropped!')
				}}
			>
				<InputWrapper>
					<Input
						action={{ icon: 'download' }} 
						placeholder='Перетащите сюда файлы'
						value={textInput}
						onChange={() => this.setState({ textInput: '' })}
					/>
				</InputWrapper>
			</SDropzone>
		)
	}
}
