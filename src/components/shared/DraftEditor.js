import React from 'react'
import {
	Editor,
	EditorState,
	ContentState,
	RichUtils,
	convertFromHTML,
	getDefaultKeyBinding,
	KeyBindingUtil,
	Modifier,
	convertToRaw
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import debounce from 'lodash/debounce'
import draftToHtml from 'draftjs-to-html'

class DraftEditor extends React.Component {
	constructor(props){
		super(props)
		let editorState
		if (props.initFromHtml) {
			const blocksFromHTML = convertFromHTML(props.initFromHtml)
			editorState = EditorState.createWithContent(
				ContentState.createFromBlockArray(
					blocksFromHTML.contentBlocks,
					blocksFromHTML.entityMap
				)
			)
		} else {
			editorState = EditorState.createEmpty()
		}
		this.state = { 
			editorState,
			oriContent: editorState.getCurrentContent()
		}
	}
	onChange = (editorState) => {
		this.setState({ editorState })
		const newContent = editorState.getCurrentContent()
		const { setEditorHasText, setHasDiff, setHasFocus, setHtml } = this.props
		if (editorState && setEditorHasText) setEditorHasText(newContent.hasText())
		if (setHasDiff) setHasDiff(newContent !== this.state.oriContent)
		if (setHasFocus) setHasFocus(editorState.getSelection().getHasFocus())
		if (setHtml) this.debouncedSetHtml(editorState)
	}
	kolmechKeyBindingFn = (e) => {
		// catch Ctrl + Enter event
		if (e.keyCode === 13 && KeyBindingUtil.hasCommandModifier(e)) {
		  return 'ctrlEnter'
		}
		return getDefaultKeyBinding(e)
	}
	handleKeyCommand = (command, editorState) => {
		const { onCtrlEnter } = this.props
		// handle Ctrl + Enter command
		if (command === 'ctrlEnter' && onCtrlEnter) {
			onCtrlEnter()
			return 'handled'
		}
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled'
		}
		return 'not-handled'
	}
	handlePastedText = (text) => {
		const {editorState} = this.state;
    const blockMap = ContentState.createFromText(text.trim()).blockMap;
    const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
    return true;
	}
	clear = () => this.setState({ 
		editorState: EditorState.push(this.state.editorState, ContentState.createFromText(''), 'remove-range')
	})
	exportHtml = (editorState = this.state.editorState) => {
		const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		if (!convertFromHTML(html).contentBlocks) return null
		return html
	}
	debouncedSetHtml = debounce(editorState => {
		this.props.setHtml(this.exportHtml(editorState))
	}, 250)
	render() {
		const {
			readOnly,
			placeholder
		} = this.props
		return (
			<Editor
				editorState={this.state.editorState}
				onChange={this.onChange}
				handleKeyCommand={this.handleKeyCommand}
				keyBindingFn={this.kolmechKeyBindingFn}
				readOnly={readOnly}
				placeholder={placeholder}
				handlePastedText={this.handlePastedText}
			/>
		)
	}
}

export default DraftEditor