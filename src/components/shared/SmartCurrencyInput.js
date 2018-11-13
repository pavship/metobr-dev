import React, { Component} from 'react'

import NumberFormat from 'react-number-format'

import { Input } from 'semantic-ui-react'
import { Span } from './styled-semantic'
import CurrencyInput from '../CurrencyInput';

class SmartCurrencyInput extends Component {
	render() {
		const { placeholder, field: {name, curVal: value}, setField } = this.props
		return (
			<>
				<NumberFormat
					// customInput={Input}
					customInput={CurrencyInput}
					placeholder={placeholder}
					value={value}
					decimalSeparator=','
					thousandSeparator=' '
					decimalScale={2}
					allowNegative={false}
					onValueChange={values => setField(name, {value: values.floatValue})} />
				{/* <Span pl='6px' fs='1.1rem' c='rgba(0,0,0,.87)'>₽</Span>
				<Span pl='9px' fs='1.1rem' ws='0.1em'>с НДС</Span> */}
			</>
		)
	}
}

export default SmartCurrencyInput
