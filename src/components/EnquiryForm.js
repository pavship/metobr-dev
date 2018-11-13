import React, { Component } from 'react'
import { Form, Button, Dropdown, Checkbox } from 'semantic-ui-react'
import { Label, FormField } from './shared/styled-semantic.js'
import SmartErrorMessage from './common/SmartErrorMessage'
import SmartForm from './shared/SmartForm'
import CenteredContainer from './common/CenteredContainer.js'
import EnquiryOrgSection from './EnquiryOrgSection'
import SmartOrgInput from './SmartOrgInput.js'
import EnquiryPersonSection from './EnquiryPersonSection'
import SmartFormField from './SmartFormField.js'
import SmartTelField from './SmartTelField.js'
import EnquiryTaskSection from './EnquiryTaskSection.js'
import LocalDatePicker from './shared/LocalDatePicker.js'
import SmartNoteField from './SmartNoteField.js'
import SmartFileField from './SmartFileField.js'

import { graphql, compose } from 'react-apollo'
import { signupAndCreateEnquiry } from '../graphql/enquiry'
import SmartCheckField from './SmartCheckField.js';
import SmartCurrencyField from './SmartCurrencyField.js';

// const enquiry = {
//   orgId: '',
//   // lName: '',
//   // fName: '',
//   // mName: '',
//   regName: '',
//   email: '',
//   tel: '',
//   country: 'rus',
//   modelName: '',
//   files: [],
//   hasWorkpeace: true,
//   qty: '',
//   period: 'none',
//   deadlineDateLocal: '',
//   maxPrice: '',
//   htmlText: '',
//   hasAgreedToRules: true,
//   hasAgreedToSearch3rdParty: false,
// }
const enquiry = {
  country: "rus",
  deadlineDateLocal: "2018-11-15",
  email: "sdf@v",
  files: [
    {name: "274832076.jpg", storeId: "cjo9it2ci00003a5rkxp8fr54"},
    {name: "474533138.jpg", storeId: "cjo9ithej00013a5r8hxzn1qo"},
    {name: "428283927.jpg", storeId: "cjo9iuhvi00023a5rvdq7wsgc"}
  ],
  hasAgreedToRules: true,
  hasAgreedToSearch3rdParty: false,
  hasWorkpeace: true,
  htmlText: "<p>sdsdf</p>↵<p>sdfsfd</p>↵",
  modelName: "sdf",
  orgId: "cjo1wyt4c000t0850ndo82net",
  period: "none",
  maxPrice: '',
  qty: 21,
  regName: " Bim  k John Van Vald",
  tel: "234342",
}

const countryOtions = [
  { key: 'rus', text: '+7', value: 'rus' },
  { key: 'other', text: 'other', value: 'other' },
]

const periodOtions = [
  { key: 'none', text: 'шт.', value: 'none' },
  { key: 'month', text: 'шт. / месяц', value: 'month' },
  { key: 'year', text: 'шт. / год', value: 'year' },
]

class EnquiryForm extends Component {
  componentIsMounted = true
  state = {
    loading: false,
    err: null
  }
  submit = async (variables) => {
    console.log('variables > ', variables)
		try {
			this.setState({ loading: true })
			const res = await this.props.signupAndCreateEnquiry({ variables })
			if (!this.componentIsMounted) return
      this.setState({ loading: false, err: null })
      // TODO navigate to ConfirmationPage
			// this.props.setDetails({
			// 	type: 'Order',
			// 	id: res.data.signupAndCreateEnquiry.id
			// })
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({
				loading: false,
				err: {
					title: `Оформить заявку не удалось..`,
					message: err.message
				}
			})
			console.log(err)
		}
	}
  render() {
    const { loading, err } = this.state
    return <>
      <SmartForm
        isNewEntity={true}
        entity={enquiry}
        requiredFields={[
          'orgId',
          'regName',
          'email',
          'tel',
          'country',
          'modelName',
          'qty',
          'period',
          'hasAgreedToRules'
        ]}
        submit={this.submit}
        err={err}
        errSkipFields={['orgId']}
      >
        {({
					disabled,
					err,
					setField,
					submit,
          formState: {
            orgId,
            regName,
            email,
            tel,
            country,
            modelName,
            files,
            hasWorkpeace,
            qty,
            period,
            deadlineDateLocal,
            maxPrice,
            htmlText,
            hasAgreedToRules,
            hasAgreedToSearch3rdParty,
          }
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
              // error
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
                inputLabel={
                  <Dropdown
                    tabIndex={-1}
                    defaultValue={country.curVal}
                    options={countryOtions}
                    onChange={(e, { value }) => setField('country', { value })}
                  />
                }
                country={country.curVal}
              />
            </Form>
          </EnquiryPersonSection>
          <EnquiryTaskSection>
            <Form
              error
            >
              <SmartFormField
                required
                label='Наименование изделия'
                placeholder='Наименование изделия'
                field={modelName}
                setField={setField}
              />
              <SmartFileField
                field={files}
                setField={setField}
              />
              <SmartCheckField
                label='Давальческая заготовка'
                field={hasWorkpeace}
                setField={setField}
              />
              <SmartFormField
                required
                type='int'
                min='1'
                label='Количество'
                placeholder='Укажите потребность'
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
              <SmartCurrencyField
                label='Проходная цена'
                field={maxPrice}
                setField={setField}
              />
              <SmartNoteField
                label='Доп. информация'
                placeholder='Любые подробности'
                field={htmlText}
                setField={setField}
              />
              
            </Form>
          </EnquiryTaskSection>
          <CenteredContainer
            p='1rem 0'
          >
						{err &&
							<SmartErrorMessage
                err={err}
                setField={setField}
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
                  checked={hasAgreedToSearch3rdParty.curVal}
                  onClick={() => setField(
                    'hasAgreedToSearch3rdParty',
                    { value: !hasAgreedToSearch3rdParty.curVal }
                  )}
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

export default compose(
	graphql(signupAndCreateEnquiry, {
			name: 'signupAndCreateEnquiry'
	}),
)(EnquiryForm)
