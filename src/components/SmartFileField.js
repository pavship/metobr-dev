import React from 'react'
import { Form } from 'semantic-ui-react'
import { Label } from './shared/styled-semantic.js'
import SmartFilesInput from './SmartFilesInput.js'

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
        va='top !important'
        pt='calc(9rem/14)'
      >
        {label || 'Файлы'}
      </Label>
      <SmartFilesInput
        {...rest}
      />
    </Form.Field>
  )
}
