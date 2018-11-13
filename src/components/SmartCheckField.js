import React from 'react'
import { Form } from 'semantic-ui-react'
import { Label } from './shared/styled-semantic.js'
import SmartCheckbox from './shared/SmartCheckbox';

export default ({
  label,
  required,
  field,
  setField,
  ...rest
}) => {
  const { err } = field
  return (
    <Form.Field
      inline
      error={!!err}
      required={required}
    >
      <Label
        va='middle !important'
      >
        {label}
      </Label>
      <SmartCheckbox
        {...rest}
        field={field}
        setField={setField}
      />
    </Form.Field>
  )
}
