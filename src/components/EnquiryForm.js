import React, { Component } from 'react'
import { Form, Button, Message, Dropdown, Input } from 'semantic-ui-react'
import { Div, Span, A, Label, Section } from './shared/styled-semantic.js'
import SmartForm from './shared/SmartForm';
import CenteredContainer from './common/CenteredContainer.js';
import EnquiryOrgSection from './EnquiryOrgSection';
import SmartOrgInput from './SmartOrgInput.js';
import EnquiryPersonSection from './EnquiryPersonSection';
import SmartFormField from './SmartFormField.js';
import SmartTelField from './SmartTelField.js';
import EnquiryModelSection from './EnquiryModelSection.js';

const enquiry = {
  orgId: '',
  lName: '',
  fName: '',
  mName: '',
  regName: '',
  email: '',
  tel: '',
  modelName: '',
  qty: '',
  period: 'none'
}

const periodOtions = [
  { key: 'rus', text: 'шт.', value: 'none' },
  { key: 'month', text: 'шт. / месяц', value: 'month' },
  { key: 'year', text: 'шт. / год', value: 'year' },
]

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
        requiredFields={['orgId', 'regName', 'email', 'tel', 'modelName', 'qty', 'period']}
        submit={this.submit}
        err={err}
        errSkipFields={['orgId']}
      >
        {({
					disabled,
					err,
					setField,
					submit,
					formState: { orgId, lName, fName, mName, regName, email, tel, modelName, qty, period }
				}) => <>
          <EnquiryOrgSection>
            <SmartOrgInput
              field={orgId}
              setField={setField}
            />
          </EnquiryOrgSection>
          <EnquiryPersonSection>
            <Form
              error
              // size='big'
            >
              {/* <SmartFormField
                label='Фамилия'
                placeholder='Введите Вашу фамилию'
                field={lName}
                setField={setField}
              /> */}
              {/* <SmartFormField
                label='Имя'
                placeholder='Введите Ваше имя'
                required
                field={fName}
                setField={setField}
              /> */}
              {/* <SmartFormField
                label='Отчество'
                placeholder='Введите Ваше отчество'
                field={mName}
                setField={setField}
              /> */}
              <SmartFormField
                label='ФИО'
                placeholder='Введите Ваше полное имя'
                required
                field={regName}
                setField={setField}
              />
              <SmartFormField
                type='email'
                label='email'
                placeholder='Введите Ваш email'
                required
                field={email}
                setField={setField}
              />
              <SmartTelField
                required
                field={tel}
                setField={setField}
              />
              {err && err.message &&
                <Message
                  error
                  header={err.title}
                  content={err.message}
                />
              }
            </Form>
          </EnquiryPersonSection>
          <EnquiryModelSection>
            <Form
              error
              // size='big'
            >
              <SmartFormField
                label='Наименование изделия'
                placeholder='Введите наименование'
                field={modelName}
                setField={setField}
              />
              <SmartFormField
                type='number'
                label='Количество'
                placeholder='Введите количество'
                required
                inputLabel={
                  <Dropdown
                    tabIndex={-1}
                    defaultValue={period.curVal}
                    options={periodOtions}
                    onChange={(e, { value }) => setField('period', { value })}
                  />
                }
                inputLabelPosition='right'
                field={qty}
                setField={setField}
              />
              {err && err.message &&
                <Message
                  error
                  header={err.title}
                  content={err.message}
                />
              }
            </Form>
          </EnquiryModelSection>
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
