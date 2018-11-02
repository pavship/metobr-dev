import React, { Component } from 'react'
import { Form, Button, Dropdown, Checkbox } from 'semantic-ui-react'
import { Label, FormField } from './shared/styled-semantic.js'
import SmartErrorMessage from './common/SmartErrorMessage'
import SmartForm from './shared/SmartForm';
import CenteredContainer from './common/CenteredContainer.js';
import EnquiryOrgSection from './EnquiryOrgSection';
import SmartOrgInput from './SmartOrgInput.js';
import EnquiryPersonSection from './EnquiryPersonSection';
import SmartFormField from './SmartFormField.js';
import SmartTelField from './SmartTelField.js';
import EnquiryTaskSection from './EnquiryTaskSection.js';
import LocalDatePicker from './shared/LocalDatePicker.js';
import SmartNoteField from './SmartNoteField.js';
import SmartFileField from './SmartFileField.js';

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
  period: 'none',
  deadlineDateLocal: '',
  htmlText: '',
  hasAgreedToRules: true,
  gather3rdPartyOffers: false,
  files: null
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
        requiredFields={['orgId', 'regName', 'email', 'tel', 'qty', 'period', 'hasAgreedToRules']}
        submit={this.submit}
        err={err}
        errSkipFields={['orgId']}
      >
        {({
					disabled,
					err,
					setField,
					submit,
					formState: { orgId, regName, email, tel, modelName, qty, period, deadlineDateLocal, htmlText, hasAgreedToRules, gather3rdPartyOffers, files }
				}) => <>
          <EnquiryOrgSection>
            <SmartOrgInput
              field={orgId}
              setField={setField}
            />
          </EnquiryOrgSection>
          <EnquiryPersonSection
            fields={[regName, email, tel]}
          >
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
                placeholder='Ваше полное имя'
                required
                field={regName}
                setField={setField}
              />
              <SmartFormField
                type='email'
                label='email'
                placeholder='Ваш email'
                required
                field={email}
                setField={setField}
              />
              <SmartTelField
                required
                field={tel}
                setField={setField}
              />
              {err && 
                <SmartErrorMessage
                  err={err}
                />
              }
            </Form>
          </EnquiryPersonSection>
          <EnquiryTaskSection>
            <Form
              error
              // size='big'
            >
              <SmartFormField
                label='Наименование изделия'
                placeholder='Наименование изделия'
                field={modelName}
                setField={setField}
              />
              <SmartFormField
                type='int'
                label='Количество'
                placeholder='Укажите потребность'
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
              <Form.Field inline>
                <Label>Крайний срок</Label>
								<LocalDatePicker
									field={deadlineDateLocal}
									setField={setField}
								/>
							</Form.Field>
              <SmartNoteField
                label='Доп. информация'
                placeholder='Опишите задачу и заготовку'
                field={htmlText}
                setField={setField}
              />
              <SmartFileField
                field={files}
                setField={setField}
              />
              {err && 
                <SmartErrorMessage
                  err={err}
                  setField={setField}
                />
              }
            </Form>
          </EnquiryTaskSection>
          <CenteredContainer
            p='1rem 0'
          >
						{err &&
							<SmartErrorMessage
								err={err}
							/>
            }
            <Form>
              <Form.Field required>
                <Checkbox
                  checked={hasAgreedToRules.curVal}
                  onClick={() => setField('hasAgreedToRules', { value: !hasAgreedToRules.curVal})}
                  label={
                    <label>Я согласен с <a 
                        href='https://www.google.com'
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >Политикой конфиденциальности</a>
                    </label>
                  }
                />
							</Form.Field>
              <FormField
                mb='1rem'
              >
                <Checkbox
                  checked={gather3rdPartyOffers.curVal}
                  onClick={() => setField('gather3rdPartyOffers', { value: !gather3rdPartyOffers.curVal})}
                  label='Разрешить собирать предложения других подрядчиков'
                />
							</FormField>
            </Form>
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
