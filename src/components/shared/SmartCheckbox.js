import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'semantic-ui-react'

const SCheckbox = styled(Checkbox)`
	&& {
		vertical-align:	middle;
	}
`

export default ({
	field: { name, curVal },
	setField,
	...rest
}) => {
	return (
		<SCheckbox
			{...rest}
			checked={curVal}
			onChange={(e, { checked }) => setField(name, { value: checked })}
		/>
	)
}
