import React from 'react'
import { Form } from 'semantic-ui-react'
import { Label } from './shared/styled-semantic.js'
import SmartNoteInput from './SmartNoteInput.js';

const SmartNoteField = ({
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
        va='top !important'
        pt='calc(9rem/14)'
      >
        {label || 'Примечание'}
      </Label>
      <SmartNoteInput
        {...rest}
      />
    </Form.Field>
  )
}

export default SmartNoteField
