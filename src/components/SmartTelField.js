import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import { Label, Input } from './shared/styled-semantic.js'
import SmartInput from './shared/SmartInput'
import InputMask from 'react-input-mask'
import debounce from 'lodash/debounce'

class SmartTelField extends Component {
  state = {
    value: this.props.field.curVal || '',
  }
  debouncedSetField = debounce(value => {
    const { field: { name }, setField } = this.props
    setField(name, { value })
  }, 250)
  handleInputChange = ({ target: { value } }) => {
    this.setState({ value })
		this.debouncedSetField(value)
  }
  render() {
    const {
      label,
      required,
      field,
      setField,
      inputLabel,
      country,
      ...rest
    } = this.props
    const { err } = field
    const { value } = this.state
    return (
      <Form.Field
        inline
        error={!!err}
        required={required}
      >
        <Label>{label || 'Телефон'}</Label>
        {country === 'rus'
          ? <InputMask
              mask='( 999 ) 999-99-99'
              maskChar=''
              value={value}
              onChange={this.handleInputChange}
            >
              {(inputProps) =>
                <Input
                  w='270px !important'
                  placeholder='Ваш номер телефона'
                  label={inputLabel}
                  {...rest}
                  {...inputProps}
                />
              }
            </InputMask>
          : <SmartInput
              w='270px !important'
              placeholder='Телефон с кодом страны'
              label={inputLabel}
              field={field}
              setField={setField}
              {...rest}
            />
        }
      </Form.Field>
    )
  }
}

export default SmartTelField
