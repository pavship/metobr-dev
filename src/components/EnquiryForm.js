import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { Div, Span, A, Label, Section } from './shared/styled-semantic.js'
import EnquiryOrgSection from './EnquiryOrgSection';
import SmartForm from './shared/SmartForm';
import SmartOrgInput from './SmartOrgInput.js';

const enquiry = {
  orgId: ''
}

class EnquiryForm extends Component {
  state = {
    loading: false,
    err: null
  }
  render() {
    const { err } = this.state
    return <>
      <SmartForm
        isNewEntity={true}
        entity={enquiry}
        requiredFields={['orgId']}
        submit={this.submit}
        err={err}
      >
        {({
					disabled,
					err,
					setField,
					submit,
					formState: { orgId }
				}) => <>
          <EnquiryOrgSection>
            <Form>
              <Form.Field
                inline
                required
                // label='ИНН'
              >
                <Label>ИНН</Label>
								<SmartOrgInput
									field={orgId}
									setField={setField}
								/>
							</Form.Field>
						</Form>
          </EnquiryOrgSection>
        </>}
      </SmartForm>
      
    </>
  }
}

export default EnquiryForm
