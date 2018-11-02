import React, { Component } from 'react'

import styled from 'styled-components'
import { Button, Input as SInput } from 'semantic-ui-react'
// import '../styles/dropzone.css'

import Dropzone from 'react-dropzone'

const SDropzone = styled(Dropzone)`
	display: inline-block !important;
	input {
		width: 231.5px !important;
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

const Input = styled(SInput)`
	&&&& input {
		/* width: 231.5px !important; */
		border-style: dashed;
		cursor: pointer;
		:hover {
			border-style: solid;
		}
	}
	${SDropzone}.activeDropzone & {
		border-color: violet !important;
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
	${({ borderless, hasFocus, diff }) =>
		borderless
		&& !hasFocus
		&& !diff && `
			margin-left: -1em;
			border: 1px solid white;
			:hover {
				background: rgba(0,0,0,.05);
				color: rgba(0,0,0,.65);
				cursor: pointer;
			}
		`
	}
`

export default class DropezoneWrapper extends Component {
	state = {
		hasFocus: false
	}
	render() {
		const { hasFocus } = this.state
		const {
			borderless,
			diff,
			forwardedRef,
			...rest
		} = this.props
		return (
			<SDropzone
				// className='ignore'
				// style={{display: 'inline-block'}}
				//// activeStyle={{border: '1px solid green'}}
				activeClassName='activeDropzone'
				onDrop={(acceptedFiles) => {
					console.log('dropped!')
				}}
			>
				{/* <DropzoneWrapper>
				</DropzoneWrapper>
					<Button attached='right'>Right</Button> */}
				<Input action={{ icon: 'download' }} placeholder='Перетащите сюда файлы' />
			</SDropzone>
		)
	}
}
