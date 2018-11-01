import React, { Component } from 'react'

import styled from 'styled-components'

import DraftEditor from './DraftEditor'

const EditorWrapper = styled.div`
	display: inline-block;
	width: 270px;
	padding: calc(8.5rem/14) 1em;
	line-height: calc(19rem/14);
	border: 1px solid rgba(34,36,38,.15);
	border-radius: calc(4rem/14);
	transition: all .1s ease;
	.public-DraftEditorPlaceholder-root {
		color: rgb(194, 195, 198);
	}
	.public-DraftEditorPlaceholder-hasFocus {
		color: rgb(125, 125, 125);
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

class WrappedDraftEditor extends Component {
	state = {
		hasFocus: false
	}
	setHasFocus = (hasFocus) => this.setState({ hasFocus })
	render() {
		const { hasFocus } = this.state
		const {
			borderless,
			diff,
			forwardedRef,
			...rest
		} = this.props
		return (
			<EditorWrapper
				borderless={borderless}
				hasFocus={hasFocus}
				diff={diff}
			>
				<DraftEditor
					ref={forwardedRef}
					setHasFocus={this.setHasFocus}
					{...rest}
				/>
			</EditorWrapper>
		)
	}
}

export default React.forwardRef((props, ref) =>
	<WrappedDraftEditor
		forwardedRef={ref}
		{...props}
	/>
)