import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import { Label, Input } from './shared/styled-semantic.js'
import InputMask from 'react-input-mask';

const options = [
  { key: '.com', text: '+7', value: 'rus' },
  { key: '.net', text: 'other', value: 'other' },
]

class SmartFormField extends Component {
  state = {
    country: 'rus'
  }
  handleInputChange = ( e, { value } ) => {
		const { field: { name }, setField } = this.props
		setField(name, { value })
  }
  render() {
    const {
      label,
      required,
      field,
      setField,
      ...rest
    } = this.props
    const { curValue, err } = field
    const { country } = this.state
    return (
      <Form.Field
        inline
        error={!!err}
        required={required}
      >        <Label>{label || 'Телефон'}</Label>
        <InputMask
          mask={
            country === 'rus'
            ? '( 999 ) 999-99-99'
            : ''
          }
          value={curValue}
          onChange={(e) => console.log('yo! > ',e.target.value)}
        >
          {(inputProps) =>
            <Input
              placeholder={
                country === 'rus'
                ? 'Введите Ваш телефон'
                : 'Телефон с кодом страны'
              }
              label={
                <Dropdown
                  tabIndex={-1}
                  defaultValue={country}
                  options={options}
                  onChange={(e, { value }) => this.setState({ country: value })}
                />
              }
              {...rest}
              w='270px !important'
            />
          }
        </InputMask>
      </Form.Field>
    )
  }
}

export default SmartFormField
