import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import { Div, Span, A, Label, Section } from './shared/styled-semantic.js'
import EnquiryOrgSection from './EnquiryOrgSection';
import SmartForm from './shared/SmartForm';
import SmartOrgInput from './SmartOrgInput.js';
import CenteredContainer from './common/CenteredContainer.js';

const enquiry = {
  orgId: ''
}

class EnquiryForm extends Component {
  state = {
    loading: false,
    err: null
  }
  render() {
    const { loading, err } = this.state
    return <>
      <SmartForm
        isNewEntity={true}
        entity={enquiry}
        requiredFields={['orgId']}
        submit={this.submit}
        err={err}
        errSkipFields={['orgId']}
      >
        {({
					disabled,
					err,
					setField,
					submit,
					formState: { orgId }
				}) => <>
          <EnquiryOrgSection>
          <SmartOrgInput
						field={orgId}
						setField={setField}
					/>
          </EnquiryOrgSection>
          <CenteredContainer
            p='1rem 0'
          >
						{err &&
							<Message
								error
								header={err.title}
								content={err.message}
							/>
						}
						<Button
							primary
							content='Отправить заявку'
							disabled={disabled}
							loading={loading}
							onClick={submit}
						/>
          </CenteredContainer>
        </>}
      </SmartForm>
      
    </>
  }
}

export default EnquiryForm
