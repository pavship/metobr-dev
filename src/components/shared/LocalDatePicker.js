import React, { Component } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import styled from 'styled-components'

import { toLocalISOString, fromLocalISOString }from '../../utils/dates'

const PickerDiv = styled.div`
	display: inline-block;
	width: 180px;
	${props => props.err && `
		input {
			color: #9f3a38 !important;
			background-color: #fff6f6 !important;
			border-color: #e0b4b4 !important;
		}`
	}
	input {
		cursor: pointer;
		vertical-align: unset !important;
		padding-left: 3.5rem !important;
		&:focus {
			cursor: text;
		}
	}
`
// getInput 
class LocalDatePicker extends Component {
	state = {
		value: this.props.field.curVal || '',
		isNotValid: this.props.field.curVal ? false : true
	}
	handleDayChange = (pickedDate, modifiers, dayPickerInput) => {
		const { setField, field: { name }} = this.props
		const inputValue = dayPickerInput.getInput().value
		if (!pickedDate) {
			this.setState({
				value: inputValue,
				isNotValid: true
			})
			if (!inputValue) return setField(name, { value: '' })
		} else {
			const dateLocal = toLocalISOString(pickedDate).slice(0, 10)
			this.setState({ value: dateLocal, isNotValid: false })
			setField(name, { value: dateLocal })
		}
	}
	handleDayPickerHide = () => {
		const { field: { name }, setField } = this.props
		const { value, isNotValid } = this.state
		if (value && isNotValid) {
			setField(name, {
				err: {
					title: 'Ошибка ввода даты', 
					message: 'Дата не соответствует формату ГГГГ-ММ-ДД'
				}
			})
		}
	}
	render() {
		const { field: { err } } = this.props
		const { value, isNotValid } = this.state
		return (
			<PickerDiv err={!!err}>
				<DayPickerInput
					value={value}
					placeholder='ГГГГ-ММ-ДД'
					onDayChange={this.handleDayChange}
					onDayPickerHide={this.handleDayPickerHide}
					dayPickerProps={{
						firstDayOfWeek: 1,
						month: isNotValid ? new Date() : fromLocalISOString(value)
					}}
				/>
			</PickerDiv>
		)
	}
}

export default LocalDatePicker
