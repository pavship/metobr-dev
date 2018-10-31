import React from 'react'
import { Form } from 'semantic-ui-react'
import { Label } from './shared/styled-semantic.js'
import SmartInput from './shared/SmartInput'

const SmartFormField = ({
  label,
  required,
  field,
  setField,
  inputLabel,
  inputLabelPosition,
  ...rest
}) => {
  const { err } = field
  return (
    <Form.Field
      inline
      error={!!err}
      required={required}
    >
      <Label>{label}</Label>
      <SmartInput
        {...rest}
        // onKeyDown={(e, t) => console.log('action > ',e.keyCode === 13)}
        field={field}
        setField={setField}
        w='270px !important'
        label={inputLabel}
        labelPosition={inputLabelPosition}
      />
    </Form.Field>
  )
}

export default SmartFormField
