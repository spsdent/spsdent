import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { useFetchAllServices } from '../../hooks';
import { addVisitAdminTimesheetValidationSchema } from '../../utils/validationSchemas';
import { register } from '../../store/actions/auth';
import { SET_MESSAGE } from '../../store/actions/types';
import { refreshApp } from '../../store/actions/refresh';
import VisitData from '../../services/visit';
import { ModalShadow, ModalText } from '../VisitPage/VisitPageElements';
import UserData from '../../services/user';
import {
  SideModalContainer,
  SideModalContent,
  FormColumn,
  StyledButtonExit,
  FormInput,
  FormButton,
  StyledButtonsModalContainer,
  StyledModalButton,
} from './AdminCreateVisitElements.js';
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
  ModalContainer,
} from '../AddVisitPage/AddVisitPageElements.js';
import HashLoader from 'react-spinners/HashLoader';

const MyStyledSelect = FormInput.withComponent('select');
const MyStyledInput = FormInput.withComponent('input');
const MyStyledButton = FormButton.withComponent('button');

// tutaj jest komponent odpowiedzialny za wyswietlenie formularza w modalu z prawej strony w grafiku admina jak klikniemy w wolny termin
// zasada dodawania wizyty jest praktycznie identyczna jak w normalnej rezerwacji z tym ze nie wybieramy w formularzu
// lekarza bo lekarza mamy wybranego wczesniej i godziny bo godzine wybieramy klikajac w pole z wolnym terminem
// wiec te dwie informacje

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
    specjalista: '',
    data: '',
    godzina: '',
    imie: '',
    nazwisko: '',
    email: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    status: false,
    pacjent: '',
  };
  const [initialState, setInitialState] = useState(visitState);
  const [serviceGroupSelected, setServiceGroupSelected] = useState('');
  const [selectedServicePrice, setSelectedServicePrice] = useState('');
  const [serviceSelected, setServiceSelected] = useState('');
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const allServicesFromDb = useFetchAllServices();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const serviceGroupHandler = (values) => {
    setServiceGroupSelected(values.grupa);
    const currentSelectedDoctor = doctors
      .filter((doctor) => doctor.doctorId === selectedDoctor)
      .map((item) => item.specjalnosci)
      .flat();
    const servicesToDisplay = allServicesFromDb.filter((service) =>
      currentSelectedDoctor.includes(service._id)
    );
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = '';
      values.data = '';
      values.godzina = '';
    } else if (!serviceGroupSelected) {
      setServiceSelected('');
      values.usluga = '';
      values.data = '';
      values.godzina = '';
    }

    return servicesToDisplay.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ));
  };

  const serviceHandler = (values) => {
    setServiceSelected(values.usluga);
    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item);

    if (values.usluga) {
      const price = selectedGroupServices.find(
        (item) => item.nazwa.toLowerCase() === values.usluga.toLowerCase()
      ).cena;
      setSelectedServicePrice(price);
    }

    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ));
  };

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
    } = values;

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
    };

    if (values.password) {
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
      );
    }

    VisitData.create(visitData)
      .then((response) => {
        setIsSubmit(false);
        isSelectedFunc(false);
        onCreate(true);
        dispatch(refreshApp());
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wizyta została utworzona!',
        });
      })
      .catch((e) => {
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wystapił błąd podczas tworzenia rezerwacji, przepraszamy.',
        });
      });
  };

  const onVisitSubmit = (values) => {
    createVisit(values);
  };

  const searchUser = (values) => {
    const { pacjent } = values;
    if (!pacjent) {
      setErrorMsg('Podaj nazwisko pacjenta');
    } else {
      UserData.getUsersByLastName(pacjent)
        .then((response) => {
          setFoundUsers(response.data);
          setIsSearched(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const fillFormHandler = (user, setValues) => {
    const { imie, nazwisko, email, telefon, miasto, ulica, kodPocztowy } = user;
    console.log('test2', user);
    const updatedVisit = {
      ...initialState,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      ulica,
      kodPocztowy,
    };
    setValues(updatedVisit);
    setIsSearched(false);
    setFoundUsers([]);
    setErrorMsg(null);
  };

  return (
    <>
      <SideModalContainer>
        {allServicesFromDb.length > 0 ? (
          <>
            <StyledButtonExit onClick={() => isSelectedFunc(false)}>
              X
            </StyledButtonExit>
            <ModalText>Zarezerwuj</ModalText>

            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={addVisitAdminTimesheetValidationSchema}
              onSubmit={() => setIsSubmit(true)}
              onReset={() => setInitialState(visitState)}
            >
              {({
                values,
                setValues,
                handleBlur,
                resetForm,
                errors,
                touched,
              }) => (
                <SideModalContent>
                  <Form>
                    <FormContainer>
                      <FormColumn>
                        {!isSearched && (
                          <>
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
                                      const { password, ...oldValues } = values;
                                      setIsCreateAccount(false);
                                      setValues(oldValues);
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
                                <RegisterText>
                                  Chcesz utworzyć konto?
                                </RegisterText>
                                <RegisterText
                                  primary
                                  onClick={() => setIsCreateAccount(true)}
                                >
                                  Kliknij tutaj
                                </RegisterText>
                              </TextContainer>
                            )}
                            <MyStyledButton type='submit'>
                              Zarezerwuj
                            </MyStyledButton>
                            <MyStyledButton type='reset'>
                              Wyczyść formularz
                            </MyStyledButton>
                          </>
                        )}
                        {currentUser &&
                          currentUser.roles.includes('ROLE_ADMIN') && (
                            <>
                              <TextContainer>
                                <p>Wyszukaj pacjenta </p>
                              </TextContainer>
                              <Field
                                as={MyStyledInput}
                                onBlur={handleBlur}
                                type='text'
                                name='pacjent'
                                placeholder='Wyszukaj pacjenta'
                              />
                              <MyStyledButton
                                onClick={() => searchUser(values)}
                                type='button'
                              >
                                Wyszukaj
                              </MyStyledButton>
                              {isSearched && (
                                <MyStyledButton
                                  onClick={() => {
                                    setIsSearched(false);
                                    setFoundUsers([]);
                                    setValues({...values, pacjent: ''})
                                    setErrorMsg('')
                                  }}
                                  type='button'
                                >
                                  Anuluj wyszukiwanie
                                </MyStyledButton>
                              )}
                              {errors.pacjent && touched.pacjent ? (
                                <p style={{ color: 'red' }}>{errors.pacjent}</p>
                              ) : null}
                            </>
                          )}

                        {foundUsers.length > 0 ? (
                          <>
                            {foundUsers.map((user) => (
                              <div
                                style={{
                                  border: '2px solid #333',
                                  width: '300px',
                                  padding: '15px',
                                  color: '#333',
                                  margin: '10px 0',
                                  fontSize: '.7em'
                                }}
                                key={user._id}
                              >
                                <p>Imie: {user.imie}</p>
                                <p>Nazwisko: {user.nazwisko}</p>
                                <p>Telefon: {user.telefon}</p>
                                <p>Miasto: {user.miasto}</p>
                                <p>Ulica: {user.ulica}</p>
                                <p>Kod-pocztowy: {user.kodPocztowy}</p>
                                <MyStyledButton
                                  onClick={() => {
                                    fillFormHandler(user, setValues);
                                  }}
                                  type='button'
                                >
                                  Wybierz tego pacjenta
                                </MyStyledButton>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p style={{ color: 'red' }}>{errorMsg}</p>
                        )}

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
                                    onVisitSubmit(values);
                                    resetForm();
                                    setIsSubmit(false);
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
          </>
        ) : (
          <HashLoader
            color='#01d4bf'
            size={50}
            css={{ width: '100%', height: '100%' }}
          />
        )}
      </SideModalContainer>
    </>
  );
};

export default AdminCreateVisit;
