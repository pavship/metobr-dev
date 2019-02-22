import React from 'react'

import styled from 'styled-components'
import { Input, Icon, Button } from 'semantic-ui-react'

import Dropzone from 'react-dropzone'

const FileItem = styled(Input)`
	&&&& {
		width: 308.5px !important;
		input {
			cursor: default;
			border-radius: 0 !important;
			border-bottom: none !important;
			border-right: 1px solid rgba(34,36,38,.15) !important;
		}
		:first-child {
			input {
				border-radius: calc(4rem/14) calc(4rem/14) 0 0 !important;
			}
		}
	}
`

const DropzoneWrapper = styled.div`
	display: inline-block;
	input {
		width: 231.5px !important;
		cursor: pointer;
		text-align: center !important;
		border-width: 2px !important;
		border-style: dashed !important;
		outline: none !important;
		color: transparent !important;
	}
	:not(:first-child) {
		input {
			border-top-left-radius: 0 !important;
			border-top-width: 1px !important;
			border-top-style: solid !important;
		}
		button {
			border-top-right-radius: 0 !important;
		}
	}
	:hover, .activeDropzone {
		input {
			border-color: rgb(0, 181, 173) !important;
		}
		button {
			color: rgba(0,0,0,.8) !important;
			background-color: rgb(0, 181, 173) !important;
			color: white !important;
		}
	}
`

const SuccessIcon = styled(Icon)`
	right: 38.5px !important;
`

const CloseButton = styled(Button)`
	&&&&& {
		border: none !important;
		box-shadow: none !important;
	}
`

export default ({
	files,
	onDrop,
	cancelUpload
}) => {
	return (
		<div
			style={{
				display: 'inline-block',
				width: '270px'
			}}
		>
			{files.map(({ file: { name }, loading }) =>
				<FileItem
					key={name}
					value={name}
					onFocus={e => e.target.blur()}
					action
					icon
					loading={loading}
				>
					<input />
					<SuccessIcon
						name='check'
						color='green'
						onClick={(name) => cancelUpload(name)}
					/>
					<CloseButton
						basic
						color='red'
						icon='close'
						onClick={(name) => cancelUpload(name)}
					/>
				</FileItem>
			)}
			<DropzoneWrapper>
				<Dropzone
					className='ignore'
					activeClassName='activeDropzone'
					onDrop={onDrop}
				>
					<Input
						action={{ icon: 'download' }} 
						placeholder='Перетащите сюда файлы'
						value=''
						onFocus={e => e.target.blur()}
					/>
				</Dropzone>
			</DropzoneWrapper>
		</div>
	)
}
