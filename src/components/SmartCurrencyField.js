import React from 'react'
import { Form } from 'semantic-ui-react'
import { Label } from './shared/styled-semantic.js'
import SmartCurrencyInput from './shared/SmartCurrencyInput.js'

export default ({
  label,
  required,
  ...rest
}) => {
  return (
    <Form.Field
      inline
      required={required}
    >
      <Label
        // va='top !important'
      >
        {label}
      </Label>
      <SmartCurrencyInput
        {...rest}
      />
    </Form.Field>
  )
}
