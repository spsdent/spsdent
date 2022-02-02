import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import { useDispatch, useSelector } from 'react-redux'
import { useFetchAllServices } from '../../hooks'
import { addVisitAdminTimesheetValidationSchema } from '../../utils/validationSchemas'
import { register } from '../../store/actions/auth'
import { SET_MESSAGE } from '../../store/actions/types'
import { refreshApp } from '../../store/actions/refresh'
import VisitData from '../../services/visit'
import {
  ModalShadow,
  ModalText,
  ModalButtonsContainer,
} from '../VisitPage/VisitPageElements'
import {
  SideModalContainer,
  SideModalContent,
  FormColumn,
  StyledButtonExit,
} from './AdminCreateVisitElements.js'
import {
  FormContainer,
  FormError,
  ModalVisitContentContainer,
  ModalVisitData,
  ModalVisitDataLabel,
  ModalVisitDataText,
  ModalVisitTextContainer,
  RegisterText,
  TextContainer,
  ModalContainer
} from '../AddVisitPage/AddVisitPageElements.js'
import styled, {css} from 'styled-components'

const FormInput = styled.input`
  width: 100%;
  max-width: 400px;
  background-color: transparent;
  border: 2px solid #333;
  outline: none;
  color: #333;
  padding: 10px 5px;
  font-family: 'Poppins';
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 7px;
  margin: 5px 0;

  &:disabled {
    cursor: not-allowed;
    background: #ddd;
    border: none;
  }

  @media screen and (min-width: 1500px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1280px) {
    font-size: 13px;
  }
  @media screen and (min-width: 960px) {
    font-size: 11px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 450px;
    font-size: 9px;
  }
`

const FormButton = styled.button`
  width: 100%;
  max-width: 350px;
  background-color: transparent;
  border: 2px solid #333;
  font-family: 'Poppins';
  color: #333;
  transition: 0.2s ease;
  cursor: pointer;
  padding: 5px 0;
  margin: 5px 0;
  font-size: 9px;

  &:hover {
    background-color: #01d4bf;
    color: #fff;
    border-color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    background: #ddd;
    border: none;
  }

  @media screen and (min-width: 1500px) {
    font-size: 17px;
  }
  @media screen and (min-width: 1280px) {
    font-size: 15px;
  }
  @media screen and (min-width: 960px) {
    font-size: 13px;
    max-width: 450px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 400px;
    font-size: 11px;
  }
`

const StyledModalButton = styled(FormButton)`
  width: 200px;
  padding: 10px 0;
  transition: .2s;

  &:hover {
    background: #01d4bf;
    border: 2px solid #01d4bf;
  }

  ${({primary}) => primary && css`
    background: #01d4bf;
    border: 2px solid #01d4bf;
    &:hover {
      background: #fff;
      border: 2px solid #333;
      color: #333;
    }
  `}
`

const StyledButtonsModalContainer = styled(ModalButtonsContainer)`
  width: 100%;
`

const MyStyledSelect = FormInput.withComponent('select')
const MyStyledInput = FormInput.withComponent('input')
const MyStyledButton = FormButton.withComponent('button')

const AdminCreateVisit = ({
  bookingInfo,
  doctors,
  selectedDoctor,
  isSelectedFunc,
  onCreate,
}) => {
  const visitState = {
    grupa: '',
    usluga: '',
    nazwisko: '',
    imie: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    email: '',
  }
  const [initialState, setInitialState] = useState(visitState)
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const allServicesFromDb = useFetchAllServices()
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const serviceGroupHandler = (values) => {
    setServiceGroupSelected(values.grupa)
    const currentSelectedDoctor = doctors
      .filter((doctor) => doctor.doctorId === selectedDoctor)
      .map((item) => item.specjalnosci)
      .flat()
    const servicesToDisplay = allServicesFromDb.filter((service) =>
      currentSelectedDoctor.includes(service._id)
    )
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = ''
      values.data = ''
      values.godzina = ''
    } else if (!serviceGroupSelected) {
      setServiceSelected('')
      values.usluga = ''
      values.data = ''
      values.godzina = ''
    }

    return servicesToDisplay.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ))
  }

  const serviceHandler = (values) => {
    setServiceSelected(values.usluga)
    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item)

    if (values.usluga) {
      const price = selectedGroupServices.find(
        (item) => item.nazwa.toLowerCase() === values.usluga.toLowerCase()
      ).cena
      setSelectedServicePrice(price)
    }

    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ))
  }

  const createVisit = (values) => {
    const {
      grupa,
      usluga,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
    } = values

    // Create object with values from form
    let visitData = {
      grupa,
      usluga,
      specjalista: {
        sid: bookingInfo.specjalista.sid,
        imie: bookingInfo.specjalista.imie,
        nazwisko: bookingInfo.specjalista.nazwisko,
      },
      data: bookingInfo.data,
      godzina: bookingInfo.godzina,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
      cena: selectedServicePrice,
      uid: currentUser !== null ? currentUser.id : null,
    }
    console.log('bookinginfo', bookingInfo)

    if (values.password) {
      // Create new visit based on provide visitData object
      dispatch(
        register(
          imie,
          nazwisko,
          telefon,
          miasto,
          ulica,
          kodPocztowy,
          email,
          values.password
        )
      )
    }
    // Create new visit based on provide visitData object
    VisitData.create(visitData)
      .then((response) => {
        setIsSubmit(false)
        isSelectedFunc(false)
        onCreate(true)
        dispatch(refreshApp())
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wizyta została utworzona!',
        })
      })
      .catch((e) => {
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wystapił błąd podczas tworzenia rezerwacji, przepraszamy.',
        })
      })
  }

  const onVisitSubmit = (values, actions) => {
    createVisit(values)
    actions.resetForm()
  }

  const onCreateHandler = (values, setValues) => {
    const { password, ...oldValues } = values
    setIsCreateAccount(false)
    setValues(oldValues)
  }

  return (
    <>
      <SideModalContainer>
        <StyledButtonExit onClick={() => isSelectedFunc(false)}>
          X
        </StyledButtonExit>
        <ModalText>Zarezerwuj</ModalText>
        {allServicesFromDb.length > 0 ? (
          <Formik
            enableReinitialize
            initialValues={initialState}
            validationSchema={addVisitAdminTimesheetValidationSchema}
            onSubmit={() => setIsSubmit(true)}
            onReset={() => setInitialState(visitState)}
          >
            {({ errors, values, setValues, handleBlur, resetForm }) => (
              <SideModalContent>
                <Form>
                  <FormContainer>
                    <FormColumn>
                      <Field as={MyStyledSelect} name='grupa'>
                        <option value=''>Wybierz grupę usług</option>
                        {serviceGroupHandler(values)}
                      </Field>
                      <ErrorMessage name='grupa'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        as={MyStyledSelect}
                        name='usluga'
                        disabled={!serviceGroupSelected}
                      >
                        <option value=''>Wybierz usługę</option>
                        {serviceHandler(values)}
                      </Field>
                      <ErrorMessage name='usluga'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='imie'
                        as={MyStyledInput}
                        type='text'
                        placeholder='Imie'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='imie'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='nazwisko'
                        type='text'
                        as={MyStyledInput}
                        placeholder='Nazwisko'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='nazwisko'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='email'
                        type='email'
                        as={MyStyledInput}
                        placeholder='E-mail'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='email'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='telefon'
                        type='number'
                        as={MyStyledInput}
                        placeholder='Telefon'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='telefon'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='miasto'
                        type='text'
                        as={MyStyledInput}
                        placeholder='Miasto'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='miasto'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='ulica'
                        type='text'
                        as={MyStyledInput}
                        placeholder='Ulica'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='ulica'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      <Field
                        name='kodPocztowy'
                        type='number'
                        as={MyStyledInput}
                        placeholder='Kod-pocztowy'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='kodPocztowy'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>

                      {isCreateAccount ? (
                        <>
                          <TextContainer>
                            <RegisterText>
                              Jednak nie chcesz tworzyc konta?
                            </RegisterText>
                            <RegisterText
                              primary
                              onClick={() => {
                                const { password, ...oldValues } = values
                                setIsCreateAccount(false)
                                setValues(oldValues)
                              }}
                            >
                              Kliknij tutaj
                            </RegisterText>
                          </TextContainer>
                          <FormInput
                            name='password'
                            type='password'
                            placeholder='Wpisz hasło'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='password'>
                            {(msg) => <FormError>{msg}</FormError>}
                          </ErrorMessage>
                        </>
                      ) : (
                        <TextContainer>
                          <RegisterText>Chcesz utworzyć konto?</RegisterText>
                          <RegisterText
                            primary
                            onClick={() => setIsCreateAccount(true)}
                          >
                            Kliknij tutaj
                          </RegisterText>
                        </TextContainer>
                      )}
                      <MyStyledButton type='submit'>Zarezerwuj</MyStyledButton>
                      <MyStyledButton type='reset'>
                        Wyczyść formularz
                      </MyStyledButton>

                      {isSubmit && (
                        <ModalShadow>
                          <ModalContainer>
                            <StyledButtonExit
                              type='button'
                              onClick={() => isSelectedFunc(false)}
                            >
                              X
                            </StyledButtonExit>
                            <ModalText>Podsumowanie</ModalText>
                            <ModalVisitContentContainer>
                              <ModalVisitData>
                                <h3>Twoje dane</h3>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Imie i nazwisko
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.imie} {values.nazwisko}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    E-mail
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.email}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Telefon
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.telefon}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Miasto
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.miasto}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Ulica
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.ulica}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Kod-pocztowy
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.kodPocztowy}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                              </ModalVisitData>
                              <ModalVisitData>
                                <h3>Umówiona wizyta</h3>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Specjalista
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {bookingInfo.specjalista.imie}
                                    {bookingInfo.specjalista.nazwisko}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Grupa
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.grupa}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Usługa
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {values.usluga}
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Data wizyty
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {bookingInfo.data}r.
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                                <ModalVisitTextContainer>
                                  <ModalVisitDataLabel>
                                    Godzina wizyty
                                  </ModalVisitDataLabel>
                                  <ModalVisitDataText>
                                    {bookingInfo.godzina}:00
                                  </ModalVisitDataText>
                                </ModalVisitTextContainer>
                              </ModalVisitData>
                            </ModalVisitContentContainer>
                            <StyledButtonsModalContainer>
                              <StyledModalButton
                                type='button'
                                onClick={() => setIsSubmit(false)}
                              >
                                Anuluj
                              </StyledModalButton>
                              <StyledModalButton
                                type='button'
                                primary
                                onClick={() => {
                                  onVisitSubmit(values)
                                  resetForm()
                                  setIsSubmit(false)
                                }}
                              >
                                Potwierdź rezerwacje
                              </StyledModalButton>
                            </StyledButtonsModalContainer>
                          </ModalContainer>
                        </ModalShadow>
                      )}
                    </FormColumn>
                  </FormContainer>
                </Form>
              </SideModalContent>
            )}
          </Formik>
        ) : (
          <p>Loading...</p>
        )}
      </SideModalContainer>
    </>
  )
}

export default AdminCreateVisit
