import React from 'react'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import { Label } from './shared/styled-semantic.js'
import SmartInput from './shared/SmartInput'

const SSmartInput = styled(SmartInput)`
  width: 270px !important;
  ${props => props.field.err && `
    >div {
      border-width: 1px 1px 1px 0 !important;
    }
  `}
`

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
      <Label
        va='middle !important'
      >
        {label}
      </Label>
      <SSmartInput
        {...rest}
        // onKeyDown={(e, t) => console.log('action > ',e.keyCode === 13)}
        field={field}
        setField={setField}
        label={inputLabel}
        labelPosition={inputLabelPosition}
      />
    </Form.Field>
  )
}

export default SmartFormField
